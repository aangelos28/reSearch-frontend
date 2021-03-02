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
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import {SharedModule} from '../shared/shared.module';
import {MyAccountComponent} from './components/my-account/my-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmailVerificationComponent,
    ReauthComponent,
    ResetPasswordComponent,
    MyAccountComponent
  ],
  exports: [
    LoginComponent,
    EmailVerificationComponent,
    ReauthComponent,
    ResetPasswordComponent,
    MyAccountComponent
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
    RouterModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AccountModule {
}
