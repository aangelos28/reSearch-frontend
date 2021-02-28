import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './interceptors/api/api.interceptor';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {PulseSpinnerComponent} from './components/pulse-spinner/pulse-spinner.component';

@NgModule({
  declarations: [
    InfoDialogComponent,
    PulseSpinnerComponent
  ],
  exports: [
    InfoDialogComponent,
    PulseSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }]
})
export class SharedModule {
}
