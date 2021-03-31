import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {NavigationModule} from '../navigation/navigation.module';
import {DeveloperPanelComponent} from './components/developer-panel/developer-panel.component';
import {TopProgressBarComponent} from './components/top-progress-bar/top-progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EtdDetailsComponent} from './components/etd-details/etd-details.component';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    DeveloperPanelComponent,
    TopProgressBarComponent,
    EtdDetailsComponent
  ],
  exports: [
    DeveloperPanelComponent,
    TopProgressBarComponent,
    EtdDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatIconModule,
    NavigationModule,
    MatProgressBarModule,
    MatPaginatorModule,
    RouterModule,
    MatDialogModule
  ]
})
export class CoreModule {
}
