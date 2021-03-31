import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchMainComponent} from './components/search-main/search-main.component';
import {SearchAdvancedComponent} from './components/search-advanced/search-advanced.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {NavigationModule} from '../navigation/navigation.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    SearchMainComponent,
    SearchAdvancedComponent,
    SearchResultsComponent
  ],
  exports: [

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
export class SearchModule {
}
