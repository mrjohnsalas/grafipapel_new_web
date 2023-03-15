import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function initCarousel(): any;
declare function initTabs(): any;
declare function initPopups(): any;
declare function initGoTo(): any;
declare function initCubeportfolio(): any;
declare function initDzsparallaxer(): any;
declare function initHorizontalProgressBars(): any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // document - ready
    initCarousel();
    initTabs();
    initPopups();
    initGoTo();
    initCubeportfolio();
    initDzsparallaxer();
    initHorizontalProgressBars();
  }

  ngOnInit(): void {
  }

}