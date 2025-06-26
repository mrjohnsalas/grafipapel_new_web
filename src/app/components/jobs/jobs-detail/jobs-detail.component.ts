import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Job } from '@models/job';
import { JobService } from '@services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobsApplyFormComponent } from '../jobs-apply-form/jobs-apply-form.component';

declare function initMap(): any;
declare function initTabs(): any;
declare function initGoTo(): any;
declare function initRating(): any;
declare function initHorizontalProgressBars(): any;

@Component({
  selector: 'app-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss']
})
export class JobsDetailComponent implements OnInit, AfterViewInit {

  pageTitle = 'Descripción del puesto de trabajo';
  currentObj?: Job;
  id?: number;
  parentPath = '/jobs';
  isLoadingData = false;

  constructor(private objService: JobService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }
  
  ngAfterViewInit(): void {
    // document - ready
    initMap();
    initTabs();
    initGoTo();
    initRating();
    initHorizontalProgressBars();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.goToIndex();
      }
      this.clearObjs();
      this.id = parseInt(params['id']);
      this.objService.get(this.id).subscribe(
        obj => this.onLoadForm(obj),
        error => this.onError(error),
        () => this.onCompleted());
    });
  }

  clearObjs() {
    this.currentObj = undefined;
    this.id = undefined;
  }

  onLoadForm(obj: Job) {
    this.currentObj = obj;
  }

  goToIndex() {
    this.router.navigate([this.parentPath]);
  }

  onError(errorResponse: HttpErrorResponse): void {
    console.error(errorResponse);
    this.router.navigate([this.parentPath]);
  }

  onCompleted(): void {
    console.log('Load job completed');
  }

  roundUp(value: number): number {
    return Math.ceil(value);
  }

  onApplyJob(): void {
    const modalForm = this.modalService.open(JobsApplyFormComponent, { size: 'lg' });
    modalForm.result.then(
      this.onCloseModalForm.bind(this),
      this.onCloseModalForm.bind(this)
    );
    modalForm.componentInstance.objName = this.currentObj?.name;
    modalForm.componentInstance.jobId = this.currentObj?.id;
    modalForm.componentInstance.jobTitle = this.currentObj?.name;
  }

  onCloseModalForm(response: any): void {
    // if (response === Object(response)) {
    //   if (response.modalMode === ModalMode.Create) {
    //     this.objs.unshift(response.obj);
    //   } else {
    //     const index = this.objs.findIndex(x => x.id == response.obj.id);
    //     this.objs[index] = response.obj;
    //   }
    //   this.filterData();
    // }
  }

}