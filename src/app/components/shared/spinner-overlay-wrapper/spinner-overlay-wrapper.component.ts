import { Component, Input } from '@angular/core';

import { SpinnerType } from '@models/spinner-type.enum';

@Component({
  selector: 'app-spinner-overlay-wrapper',
  templateUrl: './spinner-overlay-wrapper.component.html',
  styleUrls: ['./spinner-overlay-wrapper.component.scss']
})
export class SpinnerOverlayWrapperComponent {
  @Input()
  selectedSpinner = SpinnerType.DoubleBounce;

  @Input()
  showSpinner = false;

  constructor() { }
}
