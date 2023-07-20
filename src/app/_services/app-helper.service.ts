import { Injectable } from "@angular/core";
import swal from 'sweetalert';
import { AppSettingsService } from "./app-settings.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ServiceException } from "@models/service-exception.model";

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

    sendSuccessFormAlert(): Promise<any> {
        return this.sendAlert(
          this.appSettingsService.SuccessContactFormErrorTitle,
          this.appSettingsService.SuccessContactFormMessage,
          'success'
        );
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

  }