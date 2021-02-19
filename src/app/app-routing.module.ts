import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMainComponent} from './core/components/search-main/search-main.component';
import {LoginComponent} from './account/components/login/login.component';

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
    path: '**',
    component: SearchMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
