import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function initCarousel(): any;
declare function initGoTo(): any;
declare function initTabs(): any;
declare function initDzsparallaxer(): any;

@Component({
  selector: 'app-offset',
  templateUrl: './offset.component.html',
  styleUrls: ['./offset.component.scss']
})
export class OffsetComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // document - ready
    initCarousel();
    initGoTo();
    initTabs();
    initDzsparallaxer();
  }

  ngOnInit(): void {
  }

}