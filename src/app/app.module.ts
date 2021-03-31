import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {AccountModule} from './account/account.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {firebaseEnvironment} from '../environments/firebase-env';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NavigationModule} from './navigation/navigation.module';
import {SharedModule} from './shared/shared.module';
import {SearchModule} from './search/search.module';
import {ArticleManagementModule} from './article-management/article-management.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseEnvironment.firebaseConfig),
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    AccountModule,
    NavigationModule,
    SearchModule,
    ArticleManagementModule,
    SharedModule
  ],
  providers: [HttpClientModule, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
