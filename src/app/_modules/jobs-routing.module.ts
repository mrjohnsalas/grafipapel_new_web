import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobsListComponent } from '@components/jobs/jobs-list/jobs-list.component';
import { JobsDetailComponent } from '@components/jobs/jobs-detail/jobs-detail.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', component: JobsListComponent },
        { path: 'detail/:id', component: JobsDetailComponent } 
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }