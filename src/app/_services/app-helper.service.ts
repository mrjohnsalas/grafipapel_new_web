import { Injectable } from "@angular/core";
import swal from 'sweetalert';
import { AppSettingsService } from "./app-settings.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ServiceException } from "@models/service-exception.model";
import { DocumentType } from '@models/document-type.enum';
import { WellHired } from "@models/well-hired.enum";
import { ClaimType } from "@models/claim-type.enum";


@Injectable({
    providedIn: 'root',
  })
  export class AppHelperService {

    constructor(private appSettingsService: AppSettingsService) {}

    sendAlert(title: string, message: string, type: string): Promise<any> {
        return swal(title, message, type);
    }

    sendInvalidFormAlert(): Promise<any> {
        return this.sendAlert(
          this.appSettingsService.InvalidFormErrorTitle,
          this.appSettingsService.InvalidFormErrorMessage,
          'warning'
        );
    }

    sendSuccessFormAlert(title: string, message: string): Promise<any> {
      return this.sendAlert(title, message, 'success');
  }

    getServiceExceptionObject(errorResponse: HttpErrorResponse): ServiceException {
        let ex: ServiceException;
    
        // Validations error
        if (errorResponse.error.errors) {
          ex = new ServiceException(this.appSettingsService.ErrorMessage, false);
          const validation = errorResponse.error.errors;
          const fields = Object.keys(validation);
          fields.forEach((f) => {
            ex.message += validation[f].join('\n');
          });
          return ex;
        }
    
        // Not Found error
        if (errorResponse.status === 404) {
          ex = new ServiceException(`${this.appSettingsService.ErrorMessage} ${this.appSettingsService.NotFound}`, true);
          return ex;
        }
    
        // Others errors
        return errorResponse.error;
    }

    getDocumentTypeName(documentType: DocumentType | null): string {
      return documentType == null
        ? 'Seleccione uno'
        :  DocumentType[documentType];
    }

    getWellHiredName(wellHired: WellHired): string {
      switch (wellHired) {
        case WellHired.Product:
          return 'Producto';
        case WellHired.Service:
          return 'Servicio';
        default:
          return '';
      }
    }
    
    getClaimTypeName(claimType: ClaimType): string {
      switch (claimType) {
        case ClaimType.Claim:
          return 'Reclamo';
        case ClaimType.Complaint:
          return 'Queja';
        default:
          return '';
      }
    }

  }