import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account/account.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, AfterViewInit {

  public email: Promise<string> = this.accountService.getUserEmailAsync();

  // public email = 'temp';

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.email.then(verified => {
      if (verified) {
        this.router.navigate(['search']);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.accountService.user.sendEmailVerification();
  }

  public resendConfirmationEmail(): void {
    this.accountService.user.sendEmailVerification().then(() =>
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Confirmation Email Resent',
          text: 'Confirmation email resent. Please check your inbox.'
        }
      })
    ).catch(err =>
      this.dialog.open(InfoDialogComponent, {data: {title: 'Error', text: `Failed to resend confirmation email.\n${err}`}})
    );
  }

  public navigateToChangeEmail(): void {
    this.router.navigate(['change-email']);
  }

  public navigateToLogin(): void {
    this.authService.logoutFirebase().then(() =>
      this.router.navigate(['login']).then(() =>
        window.location.reload()
      )
    );
  }
}
