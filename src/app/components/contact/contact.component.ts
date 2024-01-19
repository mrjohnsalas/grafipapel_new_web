import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormHelper } from '@helpers/form-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceException } from '@models/service-exception.model';
import { ContactMessageService } from '@services/contact-message.service';
import { AppHelperService } from '@services/app-helper.service';
import { AppSettingsService } from '@services/app-settings.service';
import { ContactMessage } from '@models/contact-message.model';

declare function initMap(): any;
declare function initTabs(): any;
declare function initGoTo(): any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends FormHelper implements OnInit, AfterViewInit {

  serviceException?: ServiceException;
  isLoadingData = false;
  
  namesMaxLength = 40;
  namesMinLength = 3;
  phoneMaxLength = 15;
  emailMaxLength = 100;
  messageMaxLength = 500;
  messageMinLength = 10;

  constructor(private formBuilder: FormBuilder, public appSettingsService: AppSettingsService, private objService: ContactMessageService, private appHelperService: AppHelperService) {
    super();
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]],
      lastName: ['', [Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]],
      phone: ['', [Validators.required, Validators.maxLength(this.phoneMaxLength)]],
      message: ['', [Validators.required, Validators.minLength(this.messageMinLength), Validators.maxLength(this.messageMaxLength)]]
    });
  }

  ngAfterViewInit(): void {
    // document - ready
    initMap();
    initTabs();
    initGoTo();
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.appHelperService.sendInvalidFormAlert();
      return;
    }

    this.isLoadingData = true;
    this.serviceException = undefined;

    const formObj: ContactMessage = Object.assign({}, this.formGroup.value);

    // this.onSaveSuccess();
    this.objService.sendContactMessage(formObj).subscribe(
      obj => {},
      error => this.onError(error),
      () => this.onSaveSuccess()
    );
  }

  onSaveSuccess(): void {
    this.isLoadingData = false;
    this.appHelperService.sendSuccessFormAlert(this.appSettingsService.SuccessContactFormTitle, this.appSettingsService.SuccessContactFormMessage);
    this.formGroup.reset();
  }

  onError(errorResponse: HttpErrorResponse): void {
    this.isLoadingData = false;
    this.serviceException = this.appHelperService.getServiceExceptionObject(errorResponse);
    // TODO GO TO INDEX BECAUSE NOT FOUND
  }

}