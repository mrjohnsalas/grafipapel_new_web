import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
    readonly InvalidFormErrorTitle = 'Formulario con errores.';
    readonly InvalidFormErrorMessage = 'Algunos datos del formulario tienen errores.';
    readonly SuccessContactFormTitle = '¡Mensaje enviado!';
    readonly SuccessContactFormMessage = 'Pronto un ejecutivo de ventas se pondrá en contacto con usted.';
    readonly SuccessClaimBookFormTitle = '¡Reclamo y/o queja enviado!';
    readonly SuccessClaimBookFormMessage = 'Se ha registrado con éxito su reclamo y/o queja en nuestro Libro de Reclamaciones. Te informamos que en un plazo no mayor a quince (15) días calendario, sin opción a ampliación de plazo, te estaremos brindado una respuesta.';
    readonly RequiredErrorMessage = 'Este campo es requerido.';
    readonly NegativeValueErrorMessage = 'El valor no puede ser negativo.';
    readonly NumberGreaterThanZeroErrorMessage = 'El valor tiene que ser mayor a 0.';
    readonly MinLengthErrorMessage = 'La longitud mínima de caracteres de este campo es:';
    readonly MaxLengthErrorMessage = 'La longitud máxima de caracteres de este campo es:';
    readonly RequiredValidEmailErrorMessage = 'El valor ingresado no es un email valido.';
    readonly ErrorMessage = 'Error Message:';
    readonly NotFound = 'Su búsqueda no produjo ningún resultado.';
    
}