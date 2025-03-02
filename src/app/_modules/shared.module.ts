import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '@components/shared/menu/menu.component';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { CustomerSliderComponent } from '@components/shared/customer-slider/customer-slider.component';
import { SpinnerOverlayWrapperComponent } from '@components/shared/spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { SpinnerComponent } from '@components/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    CustomerSliderComponent,
    SpinnerOverlayWrapperComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    CustomerSliderComponent,
    SpinnerOverlayWrapperComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }