import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { BgColor } from '@models/bg-color.enum';
import { ServiceException } from '@models/service-exception.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormControlErrorMessage } from '@models/form-control-error-message.model';
import { AppSettingsService } from '@services/app-settings.service';
import { AppHelperService } from '@services/app-helper.service';
import { JobApply } from '@models/job-apply.model';
import { HttpErrorResponse } from '@angular/common/http';
import { JobApplyService } from '@services/job-apply.service';

@Component({
  selector: 'app-jobs-apply-form',
  templateUrl: './jobs-apply-form.component.html',
  styleUrls: ['./jobs-apply-form.component.scss']
})
export class JobsApplyFormComponent implements AfterViewInit {

  @ViewChild('txtDni') txtDni!: ElementRef;

  public get BgColor() {
    return BgColor;
  }

  checkControlError(control: AbstractControl): boolean {
    return (control.dirty || control.touched) && (control.errors !== null || control.invalid);
  }

  getControl(controlName: string): AbstractControl {
    return this.formGroup.get(controlName)!;
  }

  jobId: number = 0;
  jobTitle: string = '';

  serviceException?: ServiceException;
  isLoadingData = false;
  objName = '';
  errorMessages!: FormControlErrorMessage[];
  formGroup!: FormGroup;
  nameMaxLength = 50;
  phoneMaxLength = 20;
  emailMaxLength = 100;
  idMinLength = 8;

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    public appSettingsService: AppSettingsService, 
    private objService: JobApplyService, 
    private appHelperService: AppHelperService, 
    ) { 
    
    this.formGroup = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(this.idMinLength), Validators.maxLength(this.idMinLength)]],
      firstName: ['', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      phone: ['', [Validators.maxLength(this.phoneMaxLength)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]],
      cvFileName: ['', [Validators.required, Validators.maxLength(this.emailMaxLength)]],
      cvFile: [null, []]
    });
  }

  ngAfterViewInit(): void {
    this.txtDni.nativeElement.focus();
  }

  onExitModal(action: string): void {
    this.activeModal.close(action);
  }

  onFileChange(event: any): void {

    // Check if the file is selected
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Validate file type and size if necessary
      if (file.type !== 'application/pdf') {
        this.appHelperService.sendAlert('Error', 'El archivo debe ser un PDF.', 'danger');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        this.appHelperService.sendAlert('Error', 'El archivo no debe exceder los 5 MB.', 'danger');
        return;
      }

      // Set file name to the form control
      const fileName = event.target.files && event.target.files.length > 0 ? event.target.files[0].name : '';
      this.formGroup.patchValue({ 
        cvFileName: fileName,
        cvFile: file
      });

    }

  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.appHelperService.sendInvalidFormAlert();
      return;
    }

    this.isLoadingData = true;
    this.serviceException = undefined;

    const formObj : JobApply = Object.assign({}, this.formGroup.value);
    formObj.jobId = this.jobId;
    formObj.jobTitle = this.jobTitle;

    // console.log(formObj);

    this.objService.apply(formObj).subscribe(
      obj => {},
      error => this.onError(error),
      () => this.onSaveSuccess()
    );
  }

  onSaveSuccess(): void {
    this.isLoadingData = false;
    this.appHelperService.sendSuccessFormAlert(this.appSettingsService.SuccessJobApplyFormTitle, this.appSettingsService.SuccessJobApplyFormMessage);
    this.onExitModal('success');
  }
  
  onError(errorResponse: HttpErrorResponse): void {
    this.isLoadingData = false;
    this.serviceException = this.appHelperService.getServiceExceptionObject(errorResponse);
  }

}