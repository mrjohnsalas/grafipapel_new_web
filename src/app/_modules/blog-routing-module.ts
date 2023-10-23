import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from '@components/blog/article-detail/article-detail.component';
import { ArticleListComponent } from '@components/blog/article-list/article-list.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: ArticleListComponent },
        { path: 'detail/:id', component: ArticleDetailComponent } 
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }