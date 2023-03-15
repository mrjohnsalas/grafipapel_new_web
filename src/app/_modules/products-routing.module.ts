import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsDetailComponent } from '@components/products/products-detail/products-detail.component';
import { ProductsListComponent } from '@components/products/products-list/products-list.component';

const routes: Routes = [
    { path: '', 
      children: [
        { path: '', component: ProductsListComponent },
        { path: 'detail/:id', component: ProductsDetailComponent } ] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }