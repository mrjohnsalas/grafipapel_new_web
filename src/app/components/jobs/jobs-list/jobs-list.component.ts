import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Job } from '@models/job';
import { JobService } from '@services/job.service';

declare function initTabs(): any;
declare function initGoTo(): any;
declare function initCounters(): any;
declare function initPopups2(): any;
declare function initRating(): any;
declare function initDzsparallaxer(): any;

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit, AfterViewInit {

  objs: Job[] = [];
  homePath = '/home';
  jobsLines = 0;

  constructor(private objService: JobService, private router: Router) { }
  
  ngAfterViewInit(): void {
    // document - ready
    initTabs();
    initGoTo();
    initCounters();
    initPopups2();
    initRating();
    initDzsparallaxer();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.objService.getAll().subscribe(
      obj => this.onSuccess(obj),
      error => this.onError(error),
      () => this.onCompleted());
  }

  onSuccess(obj: Job[]): void {
    this.objs = obj;
    this.jobsLines = Math.ceil(this.objs.length / 3);
  }

  onError(errorResponse: HttpErrorResponse): void {
    console.error(errorResponse);
    this.router.navigate([this.homePath]);
  }

  onCompleted(): void {
    console.log('Load jobs completed');
  }

}