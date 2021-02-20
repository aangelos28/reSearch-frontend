import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ProfileWidgetComponent} from './components/profile-widget/profile-widget.component';
import {NavbarSearchComponent} from './components/navbar-search/navbar-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    ProfileWidgetComponent,
    NavbarSearchComponent
  ],
  exports: [
    NavbarComponent,
    ProfileWidgetComponent,
    NavbarSearchComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class NavigationModule {
}
