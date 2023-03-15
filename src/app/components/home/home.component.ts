import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

declare function initSliderRevolution(): any;
declare function initCarousel(): any;
declare function initTabs(): any;
declare function initCounters(): any;
declare function initGoTo(): any;
declare function initDzsparallaxer(): any;
declare function stopSliderRevolution(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  constructor() { }

  ngOnChanges(): void {
    stopSliderRevolution();
  }

  ngOnDestroy(): void {
    stopSliderRevolution();
  }

  ngAfterViewInit(): void {
    // document - ready
    initSliderRevolution();
    initCarousel();
    initTabs();
    initCounters();
    initGoTo();
    initDzsparallaxer();
  }

  ngOnInit(): void {
  }

}