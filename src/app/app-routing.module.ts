import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMainComponent} from './core/components/search-main/search-main.component';
import {LoginComponent} from './account/components/login/login.component';
import {EmailVerificationComponent} from './account/components/email-verification/email-verification.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {ReauthComponent} from './account/components/reauth/reauth.component';
import {EmailVerificationGuard} from './account/guards/email-verification/email-verification.guard';
import {ResetPasswordComponent} from './account/components/reset-password/reset-password.component';
import {map} from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMainPage = () => redirectLoggedInTo(['search']);
// @ts-ignore
const notLoggedInOrLoggedInAndEmailNotVerified = () => map(user => !(user !== null && user.emailVerified === true));

const routes: Routes = [
  {
    path: 'search',
    component: SearchMainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'reauth',
    component: ReauthComponent,
    canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToMainPage}
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
