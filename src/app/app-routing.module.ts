import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '@components/about/about.component';
import { ContactComponent } from '@components/contact/contact.component';
import { HomeComponent } from '@components/home/home.component';
import { FlexoComponent } from '@components/services/flexo/flexo.component';
import { OffsetComponent } from '@components/services/offset/offset.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'flexo', component: FlexoComponent },
  { path: 'offset', component: OffsetComponent },
  {
    path: 'products',
    loadChildren: () => import('@modules/products.module').then(module => module.ProductsModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('@modules/jobs.module').then(module => module.JobsModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }