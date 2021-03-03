import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import firebase from 'firebase';
import User = firebase.User;
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {AccountService} from '../../services/account/account.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {RedirectDataService} from '../../../shared/services/redirect-data/redirect-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {HttpClient} from '@angular/common/http';
import {AccountData} from '../../../shared/model/account-model';
import {take} from 'rxjs/operators';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  // Form controls
  public userIdField: FormControl;
  public emailField: FormControl;
  public nameField: FormControl;
  public passwordField: FormControl;

  // Edit mode states
  public nameInEditMode: boolean;
  public emailInEditMode: boolean;

  // Field change events
  public nameChanged: boolean;
  public emailChanged: boolean;

  // Original account data
  private userId: string;
  private userEmail: string;
  private userName: string;

  private subscriptions = new Subscription();

  private user: User;

  constructor(public authService: AuthService, private accountService: AccountService, private router: Router,
              private route: ActivatedRoute, private httpClient: HttpClient, private redirectData: RedirectDataService,
              private workTracker: WorkTrackerService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userIdField = new FormControl({value: '', disabled: true});
    this.nameField = new FormControl('');
    this.emailField = new FormControl('', [Validators.email]);
    this.passwordField = new FormControl({value: '************', disabled: true});

    this.user = this.accountService.user;
    this.userId = this.user.uid;
    this.userEmail = this.user.email;

    this.userIdField.setValue(this.userId);
    this.emailField.setValue(this.userEmail);

    // Get user name from backend
    this.workTracker.startWork();
    this.httpClient.get<AccountData>('/private/user/get').subscribe(userData => {
      this.userName = userData.fullName;
      this.nameField.setValue(this.userName);
      this.workTracker.finishWork();
    });

    // Basic info text box change events
    this.subscriptions.add(this.emailField.valueChanges.subscribe(() => {
      this.emailChanged = (this.emailField.value !== this.userEmail && this.emailField.value !== '');
    }));
    this.subscriptions.add(this.nameField.valueChanges.subscribe(() => {
      this.nameChanged = (this.nameField.value !== this.userName);
    }));

    // Apply redirect params, if any
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      if ((params.r === 'true' && this.redirectData.hasData()) || this.redirectData.isPersisted()) {
        if (this.redirectData.isPersisted()) {
          this.redirectData.readFromLocalStorage();
        }

        if (this.redirectData.data.redirectUri === '/my-account') {
          this.emailInEditMode = this.redirectData.data.redirectParams.emailInEditMode;
          this.emailField.setValue(this.redirectData.data.redirectParams.email);

          // Clear redirect parameters now that we read them
          this.redirectData.reset();

          this.saveEmailChanges();
        }
      }
    }));
  }

  public toggleNameEditMode(): void {
    this.nameInEditMode = !this.nameInEditMode;

    if (!this.nameInEditMode) {
      this.nameField.setValue(this.userName);
    }
  }

  /**
   * Attempts to save the new name entered by the user.
   */
  public saveNameChanges(): void {
    const newName: string = this.nameField.value;
    const newAccountData: AccountData = {fullName: this.nameField.value};

    this.workTracker.startWork();

    this.httpClient.put('/private/user/update', newAccountData).pipe(take(1)).subscribe(() => {
      this.user.updateProfile({displayName: newName}).then(() => {
        this.userName = newName;
        this.nameField.setValue(newName);

        this.snackBar.open('Updated name', 'X', {
          duration: 5000
        });

        this.toggleNameEditMode();

        // TODO fix
        // this.authService.firebaseAuth.updateCurrentUser(this.user);
      }).catch(err => {
        this.dialog.open(InfoDialogComponent, {data: {text: `${err}`}});
      }).finally(() => this.workTracker.finishWork());
    });
  }

  public toggleEmailEditMode(): void {
    this.emailInEditMode = !this.emailInEditMode;

    if (!this.emailInEditMode) {
      this.emailField.setValue(this.userEmail);
    }
  }

  /**
   * Attempts to save the new email entered by the user.
   */
  public saveEmailChanges(): void {
    const newEmail: string = this.emailField.value;

    this.workTracker.startWork();

    this.user.updateEmail(newEmail).then(() => {
      this.userEmail = newEmail;
      this.emailField.setValue(newEmail);

      this.snackBar.open('Updated email', 'X', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });

      this.toggleEmailEditMode();
      this.authService.firebaseAuth.updateCurrentUser(this.user);

      this.workTracker.finishWork();
    }).catch(err => {
      this.workTracker.finishWork();
      if (err.code === 'auth/requires-recent-login') {
        this.handleReauth();
      } else {
        this.dialog.open(InfoDialogComponent, {data: {title: 'Error', text: `${err}`}});
      }
    });
  }

  /**
   * Handles re-authenticating the user with email-password or various different
   * third party providers.
   * @private
   */
  private handleReauth(): void {
    this.redirectData.reset();

    // Set redirect data
    this.redirectData.data.redirectUri = this.router.url;
    this.redirectData.data.redirectParams = {
      emailInEditMode: this.emailInEditMode,
      email: this.emailField.value
    };

    this.accountService.getIdTokenAsync().then(idTokenResult => {
      if (idTokenResult.signInProvider === 'password') {
        this.workTracker.finishWork();
        this.router.navigate(['reauth']);
      } else {
        if (idTokenResult.signInProvider === 'google.com') {
          this.redirectData.persistToLocalStorage();
          this.workTracker.finishWork();
          this.authService.reauthGoogle(this.user);
        }
      }
    });
  }

  /**
   * Sends email to reset password.
   */
  public resetPassword(): void {
    this.workTracker.startWork();
    this.accountService.sendPasswordResetEmailAsync(this.user.email).then(() => {
      this.workTracker.finishWork();
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Password Reset Email Sent',
          text: `An email has been sent to reset your password. Please check your inbox.`
        }
      });
    });
  }
}
