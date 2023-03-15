import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function initCarousel(): any;
declare function initGoTo(): any;
declare function initTabs(): any;
declare function initDzsparallaxer(): any;
declare function initCubeportfolio(): any;

@Component({
  selector: 'app-flexo',
  templateUrl: './flexo.component.html',
  styleUrls: ['./flexo.component.scss']
})
export class FlexoComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // document - ready
    initCarousel();
    initGoTo();
    initTabs();
    initCubeportfolio();
    initDzsparallaxer();
  }

  ngOnInit(): void {
  }
  
}