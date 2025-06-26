import { Component, Input } from '@angular/core';

import { BgColor } from '@models/bg-color.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input()
  bgColor: BgColor = BgColor.Success;

  @Input()
  text: string = "";

  @Input()
  isDismissable: boolean = true;

  @Input()
  classNameForIcon: string = "";

  spin = "fa fa-circle-o-notch fa-spin";

  constructor() { }
}
