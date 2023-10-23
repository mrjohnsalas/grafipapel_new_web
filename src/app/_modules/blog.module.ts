import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@modules/shared.module';
import { BlogComponent } from '@components/blog/blog.component';
import { ArticleListComponent } from '@components/blog/article-list/article-list.component';
import { ArticleDetailComponent } from '@components/blog/article-detail/article-detail.component';
import { BlogRoutingModule } from './blog-routing-module';

@NgModule({
  declarations: [
    BlogComponent,
    ArticleListComponent,
    ArticleDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }