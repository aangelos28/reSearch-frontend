import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReauthComponent} from './components/reauth/reauth.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    EmailVerificationComponent,
    ReauthComponent,
    ResetPasswordComponent
  ],
  exports: [
    LoginComponent,
    EmailVerificationComponent,
    ReauthComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ]
})
export class AccountModule {
}
