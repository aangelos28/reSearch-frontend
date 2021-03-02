import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account/account.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {WorkTrackerService} from '../../../shared/services/work-tracker/work-tracker.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  public email: Promise<string> = this.accountService.getUserEmailAsync();

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router,
              private workTracker: WorkTrackerService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.accountService.getEmailVerifiedAsync().then(verified => {
      if (verified) {
        this.router.navigate(['search']);
      }
    });
  }

  public resendConfirmationEmail(): void {
    this.workTracker.startWork();
    this.accountService.user.sendEmailVerification().then(() => {
      this.workTracker.finishWork();
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Confirmation Email Resent',
          text: 'Confirmation email resent. Please check your inbox.'
        }
      });
    }).catch(err => {
      this.workTracker.finishWork();
      this.dialog.open(InfoDialogComponent, {data: {title: 'Error', text: `Failed to resend confirmation email.\n${err}`}});
    });
  }

  public backToLogin(): void {
    this.authService.logoutFirebase().then(() => {
      this.router.navigate(['login']);
    });
  }
}
