import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyArticlesComponent} from './components/my-articles/my-articles.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { AddArticleComponent } from './components/add-article/add-article.component';

@NgModule({
  declarations: [
    MyArticlesComponent,
    AddArticleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ArticleManagementModule {
}
