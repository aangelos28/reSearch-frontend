import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyArticlesComponent} from './components/my-articles/my-articles.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { AddArticleComponent } from './components/add-article/add-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '../shared/shared.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    MyArticlesComponent,
    AddArticleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    SharedModule,
    MatIconModule
  ]
})
export class ArticleManagementModule {
}
