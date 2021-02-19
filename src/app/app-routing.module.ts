import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMainComponent} from './core/components/search-main/search-main.component';
import {LoginComponent} from './account/components/login/login.component';
import {EmailVerificationComponent} from './account/components/email-verification/email-verification.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMainPage = () => redirectLoggedInTo(['search']);

const routes: Routes = [
  {
    path: 'search',
    component: SearchMainComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToMainPage}
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
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
