import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@modules/shared.module';

import { JobsRoutingModule } from '@modules/jobs-routing.module';

import { JobsComponent } from '@components/jobs/jobs.component';
import { JobsListComponent } from '@components/jobs/jobs-list/jobs-list.component';
import { JobsDetailComponent } from '@components/jobs/jobs-detail/jobs-detail.component';

@NgModule({
  declarations: [
    JobsComponent,
    JobsListComponent,
    JobsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }