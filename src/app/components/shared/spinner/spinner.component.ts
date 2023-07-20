import { Component, Input } from '@angular/core';

import { SpinnerType } from '@models/spinner-type.enum';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input()
  selectedSpinner: SpinnerType = SpinnerType.DoubleBounce;

  public get SpinnerType() {
    return SpinnerType;
  }

  constructor() { }
}
