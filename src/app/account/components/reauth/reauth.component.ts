import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AccountService} from '../../services/account/account.service';
import {RedirectDataService} from '../../../shared/services/redirect-data/redirect-data.service';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-reauth',
  templateUrl: './reauth.component.html',
  styleUrls: ['./reauth.component.css']
})
export class ReauthComponent implements OnInit {

  public reauthForm: FormGroup;

  // Redirection parameters
  private redirectRoute: string;

  constructor(public authService: AuthService, private accountService: AccountService, private router: Router,
              private redirectData: RedirectDataService, private workTracker: WorkTrackerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reauthForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    // Get redirection parameters
    this.redirectRoute = this.redirectData.data.redirectUri;
    console.log(this.redirectRoute);
  }

  get password(): AbstractControl {
    return this.reauthForm.get('password');
  }

  public reauthEmailPassword(): void {
    this.workTracker.startWork();

    const password: string = this.password.value;

    this.authService.reauthEmailPassword(this.accountService.user, password).then(() => {
      this.router.navigate([this.redirectRoute], {queryParams: {r: true}});
    }).catch(err => {
      this.dialog.open(InfoDialogComponent, {data: {title: 'Error', text: 'Failed to verify your password. Please try again.'}});
    }).finally(() => {
      this.workTracker.finishWork();
    });
  }
}
