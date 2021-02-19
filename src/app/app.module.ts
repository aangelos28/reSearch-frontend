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
    AccountModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
