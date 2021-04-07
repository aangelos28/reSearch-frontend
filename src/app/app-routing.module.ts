import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMainComponent} from './search/components/search-main/search-main.component';
import {LoginComponent} from './account/components/login/login.component';
import {EmailVerificationComponent} from './account/components/email-verification/email-verification.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {ReauthComponent} from './account/components/reauth/reauth.component';
import {EmailVerificationGuard} from './account/guards/email-verification/email-verification.guard';
import {ResetPasswordComponent} from './account/components/reset-password/reset-password.component';
import {MyAccountComponent} from './account/components/my-account/my-account.component';
import {SearchResultsComponent} from './search/components/search-results/search-results.component';
import {EtdDetailsComponent} from './core/components/etd-details/etd-details.component';
import {MyArticlesComponent} from './article-management/components/my-articles/my-articles.component';
import {AddArticleComponent} from './article-management/components/add-article/add-article.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMainPage = () => redirectLoggedInTo(['search']);

const routes: Routes = [
  {
    path: 'search',
    component: SearchMainComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: 'etd/:etdId',
    component: EtdDetailsComponent
  },
  {
    path: 'my-articles',
    component: MyArticlesComponent,
    canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'add-article',
    component: AddArticleComponent,
    canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AngularFireAuthGuard, EmailVerificationGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
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
