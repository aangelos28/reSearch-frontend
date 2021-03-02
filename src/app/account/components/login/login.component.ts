import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {RedirectDataService} from '../../../shared/services/redirect-data/redirect-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../../services/account/account.service';
import {AccountData} from '../../model/account-model';
import {tap} from 'rxjs/operators';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.touched && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.touched && control.parent && control.parent.invalid && control.parent.dirty);

    return control.touched && control.parent.errors && (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public errorMatcher: CustomErrorStateMatcher;

  public emailMaxLength = 64;
  public fullNameMaxLength = 64;

  public passwordMinLength = 8;
  public passwordMaxLength = 64;

  public handlingAuthentication = false;

  static passwordConfirmValidation(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    return (password !== null && confirmPassword !== null && password === confirmPassword) ? null : {passwordMismatch: true};
  }

  static emailConfirmValidation(fg: FormGroup): ValidationErrors | null {
    const email = fg.get('email').value;
    const confirmEmail = fg.get('confirmEmail').value;
    return (email !== null && confirmEmail !== null && email === confirmEmail) ? null : {emailMismatch: true};
  }

  constructor(public auth: AuthService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog,
              private accountService: AccountService, private redirectDataService: RedirectDataService,
              private workTracker: WorkTrackerService) {
  }

  private handleAuthentication(): void {
    // Check for redirected auth
    if (localStorage.getItem('redirectAuthentication') !== null) {
      this.handlingAuthentication = true;
      localStorage.removeItem('redirectAuthentication');
      const accountCreationData: AccountData = {fullName: ''};
      this.accountService.checkCreateUserBackend(accountCreationData).subscribe(existsOrCreated => {
        if (existsOrCreated) {
          this.redirectDataService.reset();
          this.router.navigate(['search']);
        } else {
          this.auth.logoutFirebase().then(() => {
            this.router.navigate(['search']);
          });
        }
      });
    }

    // Not redirected auth. Check for authentication
    this.auth.firebaseAuth.currentUser.then(user => {
      if (!user) {
        return;
      }
      if (user.emailVerified === true) {
        this.router.navigate(['search']);
      }
    });
  }

  ngOnInit(): void {
    this.handleAuthentication();

    this.errorMatcher = new CustomErrorStateMatcher();

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.registerForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.fullNameMaxLength)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(this.emailMaxLength)
      ]),
      confirmEmail: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)
      ]),
      confirmPassword: new FormControl('')
    }, {validators: [LoginComponent.passwordConfirmValidation, LoginComponent.emailConfirmValidation]});
  }

  get emailLogin(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordLogin(): AbstractControl {
    return this.loginForm.get('password');
  }

  get fullNameRegister(): AbstractControl {
    return this.registerForm.get('fullName');
  }

  get emailRegister(): AbstractControl {
    return this.registerForm.get('email');
  }

  get confirmEmailRegister(): AbstractControl {
    return this.registerForm.get('confirmEmail');
  }

  get passwordRegister(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPasswordRegister(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  public loginEmailPassword(): void {
    const email: string = this.emailLogin.value;
    const password: string = this.passwordLogin.value;

    this.workTracker.startWork();
    this.auth.loginFirebaseEmailPassword(email, password).then(() => {
      this.auth.firebaseAuth.currentUser.then(user => {
        // Ensure that the user has a verified email
        if (user.emailVerified) {
          this.accountService.checkUserAccountExistsBackend().subscribe(accountExists => {
            if (accountExists) {
              // User account exists, we can proceed with login
              this.workTracker.finishWork();
              this.router.navigate(['search']);
            } else {
              // User account does not exist in the backend. We need to create one.
              let accountCreationData: AccountData = {fullName: ''};

              // Read registration data from local storage if it exists
              if (localStorage.getItem('checkCreateUserBackend') !== null) {
                accountCreationData = JSON.parse(localStorage.getItem('accountCreationData'));
              }

              // Create user account in backend
              this.accountService.createUserAccountBackend(accountCreationData).subscribe(accountCreated => {
                if (accountCreated) {
                  localStorage.removeItem('checkCreateUserBackend');
                  localStorage.removeItem('accountCreationData');
                  this.workTracker.finishWork();
                  this.router.navigate(['search']);
                } else {
                  this.workTracker.finishWork();
                  this.dialog.open(InfoDialogComponent, {
                    data: {
                      title: 'Error',
                      text: 'Failed to create account in server. Please try again later or contact support.'
                    }
                  });
                }
              });
            }
          });
        } else {
          // User does not have a verified email
          this.workTracker.finishWork();
          this.router.navigate(['verify-email']);
        }
      });
    }).catch(err => {
      this.workTracker.finishWork();
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Error',
          text: 'Invalid login credentials. Either your email or password are wrong.'
        }
      });
    });
  }

  public loginGoogle(): void {
    localStorage.setItem('redirectAuthentication', String(true));

    this.auth.loginFirebaseGoogle().then(() => {
      // Login is with redirect
      console.log('Login with google');
      const accountCreationData: AccountData = {fullName: ''};
      this.accountService.checkCreateUserBackend(accountCreationData).pipe(
        tap(existsOrCreated => {
          if (existsOrCreated) {
            this.router.navigate(['search']);
          }
        })
      );
    });
  }

  public register(): void {
    const email = this.emailRegister.value;
    const password = this.passwordRegister.value;
    const accountCreationData: AccountData = {
      fullName: this.fullNameRegister.value
    };
    localStorage.setItem('checkCreateUserBackend', String(true));
    localStorage.setItem('accountCreationData', JSON.stringify(accountCreationData));

    this.auth.createAccount(email, password).then(() => {
      this.auth.firebaseAuth.currentUser.then(user => {
        user.sendEmailVerification().then(() =>
          this.router.navigate(['verify-email'])
        );
      });
    }).catch(err =>
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Error',
          text: `Failed to create account.\n${err}`
        }
      })
    );
  }
}
