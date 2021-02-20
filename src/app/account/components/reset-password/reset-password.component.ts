import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account/account.service';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;

  constructor(public accountService: AccountService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  get email(): AbstractControl {
    return this.resetPasswordForm.get('email');
  }

  public sendPasswordResetEmail(): void {
    const email: string = this.email.value;

    this.accountService.sendPasswordResetEmailAsync(email).then(() =>
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Success',
          text: 'Password resent email sent. Please check your inbox.'
        }
      })
    ).catch(err =>
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Error',
          text: 'Failed to send password reset email.'
        }
      })
    );
  }
}
