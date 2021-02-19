import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchMainComponent} from './components/search-main/search-main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {NavigationModule} from '../navigation/navigation.module';

@NgModule({
  declarations: [
    SearchMainComponent
  ],
  exports: [
    SearchMainComponent
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
    NavigationModule
  ]
})
export class CoreModule {
}
