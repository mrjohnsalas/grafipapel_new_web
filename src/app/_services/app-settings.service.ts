import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
    readonly InvalidFormErrorTitle = 'Formulario con errores.';
    readonly InvalidFormErrorMessage = 'Algunos datos del formulario tienen errores.';
    readonly SuccessContactFormErrorTitle = '¡Mensaje enviado!';
    readonly SuccessContactFormMessage = 'Pronto un ejecutivo de ventas se pondrá en contacto con usted.';
    readonly RequiredErrorMessage = 'Este campo es requerido.';
    readonly MinLengthErrorMessage = 'La longitud mínima de caracteres de este campo es:';
    readonly MaxLengthErrorMessage = 'La longitud máxima de caracteres de este campo es:';
    readonly RequiredValidEmailErrorMessage = 'El valor ingresado no es un email valido.';
    readonly ErrorMessage = 'Error Message:';
    readonly NotFound = 'Su búsqueda no produjo ningún resultado.';
    
}