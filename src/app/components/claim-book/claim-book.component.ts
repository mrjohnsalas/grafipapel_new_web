import { Component, OnInit } from '@angular/core';
import { FormHelper } from '@helpers/form-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceException } from '@models/service-exception.model';
import { AppHelperService } from '@services/app-helper.service';
import { AppSettingsService } from '@services/app-settings.service';
import { DocumentType } from '@models/document-type.enum';
import { WellHired } from '@models/well-hired.enum';
import { ClaimType } from '@models/claim-type.enum';
import { CustomValidatorService } from '@services/custom-validator.service';
import { ClaimBookService } from '@services/claim-book.service';
import { ClaimBook } from '@models/claim-book.model';
import { CityService } from '@services/city.service';
import { CountyService } from '@services/county.service';
import { State } from '@models/state.model';
import { City } from '@models/city.model';
import { County } from '@models/county.model';
import { StateService } from '@services/state.service';

@Component({
  selector: 'app-claim-book',
  templateUrl: './claim-book.component.html',
  styleUrls: ['./claim-book.component.scss']
})
export class ClaimBookComponent extends FormHelper implements OnInit {

  serviceException?: ServiceException;
  isLoadingData = false;

  documentTypeSelectedValue: number = -1;
  
  razonSocialMaxLength = 100;
  descriptionMinLength = 10;
  descriptionMaxLength = 100;
  addressMaxLength = 100;
  addressMinLength = 5;
  namesMaxLength = 50;
  namesMinLength = 3;

  phoneMaxLength = 15;
  emailMaxLength = 100;

  messageMinLength = 10;
  messageMaxLength = 254;

  nroDocumentMaxLength = 8;
  parentNroDocumentMaxLength = 8;

  states!: State[];
  cities?: City[] = [];
  counties?: County[] = [];

  stateSelected?: State;
  citySelected?: City;
  countySelected?: County;

  documentTypes = [-1, DocumentType.Dni, DocumentType.Ce, DocumentType.Ruc];
  parentDocumentTypes = [null, DocumentType.Dni, DocumentType.Ce];
  wellHireds = [WellHired.Product, WellHired.Service];
  claimTypes = [ClaimType.Claim, ClaimType.Complaint];

  constructor(
    private formBuilder: FormBuilder, 
    public appSettingsService: AppSettingsService, 
    private objService: ClaimBookService, 
    public appHelperService: AppHelperService,
    private customValidatorService: CustomValidatorService,
    private stateService: StateService,
    private cityService: CityService,
    private countyService: CountyService) {
    super();
    this.formGroup = this.formBuilder.group({
      consumerDocumentType: [-1, [Validators.required]],
      consumerDocumentId: ['', []],
      
      costumerRazonSocial: ['', []],
      consumerFirstName: ['', []],
      consumerLastName: ['', []],

      consumerPhone: ['', [Validators.maxLength(this.phoneMaxLength)]],
      consumerEmail: ['', [Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]],
      
      consumerCountryId: ['PE', []],
      consumerStateId: ['', [Validators.required]],
      consumerCity: ['', [Validators.required]],
      consumerCounty: ['', [Validators.required]],
      consumerAddress: ['', [Validators.required, Validators.minLength(this.addressMinLength), Validators.maxLength(this.addressMaxLength)]],
      
      parentDocumentType: [null, []],
      parentDocumentId: ['', []],
      parentFirstName: ['', []],
      parentLastName: ['', []],
      parentPhone: ['', [Validators.maxLength(this.phoneMaxLength)]],
      parentEmail: ['', []],

      wellHired: [1, [Validators.required]],
      saleOrderId: [, [customValidatorService.numberGreaterThanZero]],
      description: ['', [Validators.required, Validators.minLength(this.descriptionMinLength), Validators.maxLength(this.descriptionMaxLength)]],
      claimAmount: [, [customValidatorService.negativeNumber]],

      claimType: [1, [Validators.required]],
      claimDetail: ['', [Validators.required, Validators.minLength(this.messageMinLength), Validators.maxLength(this.messageMaxLength)]],
      consumerRequest: ['', [Validators.required, Validators.minLength(this.messageMinLength), Validators.maxLength(this.messageMaxLength)]],

      answer: ['', [Validators.maxLength(this.messageMaxLength)]],
      answerDate: [, []]
    });
  }

  ngOnInit(): void {
    this.onDocumentTypeChange();
    this.onParentDocumentTypeChange();
    this.loadState();
    
  }

  public get DocumentType() {
    return DocumentType;
  }

  loadState(): void {
    this.stateService.getAllByCountryId('PE').subscribe(
      (obj) => { 
        this.states = obj.sort((a, b) => (a.name > b.name) ? 1 : -1)
      },
      (error) => this.onError(error),
      () => { 
        console.log('States loaded!');
        this.onStateIdChange();
        this.onCityIdChange();
        this.onCountyIdChange();
      }
    );
  }

  onStateIdChange(): void {
    this.getControl('consumerStateId').valueChanges.subscribe( stateId => {
      if (stateId) {
        this.isLoadingData = true;
        this.cityService.getAll(stateId).subscribe(
          (objs) => this.onCitiesSuccess(objs),
          (error) => this.onError(error),
          () => {
            this.stateSelected = this.states.find(x => x.id === stateId);
            this.citySelected = undefined;
            this.countySelected = undefined;
            this.getControl('consumerCity').reset();
            this.getControl('consumerCounty').reset();
            this.getControl('consumerCity').setValue(null);
            this.getControl('consumerCounty').setValue(null);
            this.isLoadingData = false;
          }
        ); 
      }
    });
  }

  onCitiesSuccess(obj: City[]): void {
    this.cities = obj.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  onCityIdChange(): void {
    this.getControl('consumerCity').valueChanges.subscribe( cityId => {
      if (cityId) {
        this.isLoadingData = true;
        this.countyService.getAll(cityId).subscribe(
          (objs) => this.onCountiesSuccess(objs),
          (error) => this.onError(error),
          () => {
            this.citySelected = this.cities!.find(x => x.id === cityId);
            this.countySelected = undefined;
            this.getControl('consumerCounty').reset();
            this.getControl('consumerCounty').setValue(null);
            this.isLoadingData = false;
            //this.stateSelected = this.states.find(x => x.id === city);
          }
        ); 
      }
    });
  }

  onCountiesSuccess(obj: County[]): void {
    this.counties = obj.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  onCountyIdChange(): void {
    this.getControl('consumerCounty').valueChanges.subscribe( countyId => {
      if (countyId) {
        this.countySelected = this.counties!.find(x => x.id === countyId);
      }
    });
  }

  onDocumentTypeChange(): void {
    this.getControl('consumerDocumentType').valueChanges.subscribe( documentType => {
      this.documentTypeSelectedValue = documentType;
      if (this.documentTypeSelectedValue == DocumentType.Ruc) {
        this.nroDocumentMaxLength = 11;
        this.getControl('costumerRazonSocial').setValidators([Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.razonSocialMaxLength)]);
        this.getControl('costumerRazonSocial').updateValueAndValidity();
  
        this.getControl('consumerDocumentId').setValidators([Validators.required, Validators.minLength(this.nroDocumentMaxLength), Validators.maxLength(this.nroDocumentMaxLength)]);
        this.getControl('consumerDocumentId').updateValueAndValidity();
  
        this.getControl('consumerFirstName').clearValidators();
        this.getControl('consumerLastName').clearValidators();
        
        this.getControl('parentDocumentId').clearValidators();
        this.getControl('parentFirstName').clearValidators();
        this.getControl('parentLastName').clearValidators();
        this.getControl('parentPhone').clearValidators();
        this.getControl('parentEmail').clearValidators();
        
      }

      if (this.documentTypeSelectedValue == DocumentType.Dni) {
        this.nroDocumentMaxLength = 8;
      }
  
      if (this.documentTypeSelectedValue == DocumentType.Ce) {
        this.nroDocumentMaxLength = 12;
      }
  
      if (this.documentTypeSelectedValue != DocumentType.Ruc) {
        this.getControl('consumerFirstName').setValidators([Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]);
        this.getControl('consumerFirstName').updateValueAndValidity();
        this.getControl('consumerLastName').setValidators([Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]);
        this.getControl('consumerLastName').updateValueAndValidity();

        this.getControl('consumerDocumentId').setValidators([Validators.required, Validators.minLength(this.nroDocumentMaxLength), Validators.maxLength(this.nroDocumentMaxLength)]);
        this.getControl('consumerDocumentId').updateValueAndValidity();
  
        this.getControl('costumerRazonSocial').clearValidators();
      }
  
      
    });
  }

  onParentDocumentTypeChange(): void {
    this.getControl('parentDocumentType').valueChanges.subscribe( documentType => {
      if (documentType == null) {
        
        this.getControl('parentDocumentId').clearValidators();
        this.getControl('parentFirstName').clearValidators();
        this.getControl('parentLastName').clearValidators();
        this.getControl('parentPhone').clearValidators();
        this.getControl('parentEmail').clearValidators();
        
      }

      if (documentType == DocumentType.Dni) {
        this.parentNroDocumentMaxLength = 8;
      }
  
      if (documentType == DocumentType.Ce) {
        this.parentNroDocumentMaxLength = 12;
      }
  
      if (documentType != null) {
        this.getControl('parentFirstName').setValidators([Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]);
        this.getControl('parentFirstName').updateValueAndValidity();
        this.getControl('parentLastName').setValidators([Validators.required, Validators.minLength(this.namesMinLength), Validators.maxLength(this.namesMaxLength)]);
        this.getControl('parentLastName').updateValueAndValidity();
        this.getControl('parentEmail').setValidators([Validators.required, Validators.email, Validators.maxLength(this.emailMaxLength)]);
        this.getControl('parentEmail').updateValueAndValidity();

        this.getControl('parentDocumentId').setValidators([Validators.required, Validators.minLength(this.parentNroDocumentMaxLength), Validators.maxLength(this.parentNroDocumentMaxLength)]);
        this.getControl('parentDocumentId').updateValueAndValidity();
      }
  
    });
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.appHelperService.sendInvalidFormAlert();
      return;
    }

    this.isLoadingData = true;
    this.serviceException = undefined;

    const formObj: ClaimBook = Object.assign({}, this.formGroup.value);

    this.objService.create(formObj).subscribe(
      obj => {},
      error => this.onError(error),
      () => this.onSaveSuccess()
    );
  }

  onSaveSuccess(): void {
    this.isLoadingData = false;
    this.appHelperService.sendSuccessFormAlert(this.appSettingsService.SuccessClaimBookFormTitle, this.appSettingsService.SuccessClaimBookFormMessage);
    this.formGroup.reset();
  }

  onError(errorResponse: HttpErrorResponse): void {
    this.isLoadingData = false;
    this.serviceException = this.appHelperService.getServiceExceptionObject(errorResponse);
    // TODO GO TO INDEX BECAUSE NOT FOUND
  }

}