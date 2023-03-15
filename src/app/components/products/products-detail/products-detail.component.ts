import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '@models/product';
import { ProductPacking } from '@models/product-packing';
import { ProductService } from '@services/product.service';

declare function initCarousel(): any;
declare function initGoTo(): any;
declare function initTabs(): any;

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit, AfterViewInit {

  pageTitle = 'Descripción del producto';
  currentObj!: Product;
  id!: string;
  parentPath = '/products';

  constructor(private objService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    initCarousel();
    initGoTo();
    initTabs();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] === undefined) {
        this.goToIndex();
      }
      // this.clearObjs();
      this.id = params['id'];
      this.objService.get(this.id!).subscribe(
        obj => this.onLoadForm(obj),
        error => this.onError(error),
        () => this.onCompleted());
    });
  }

  onLoadForm(obj: Product) {
    this.currentObj = obj;
  }

  goToIndex() {
    this.router.navigate([this.parentPath]);
  }

  onError(errorResponse: HttpErrorResponse): void {
    console.error(errorResponse);
    this.router.navigate([this.parentPath]);
  }

  onCompleted(): void {
    console.log('Load product completed');
  }

  roundUp(value: number): number {
    return Math.ceil(value);
  }

  arrayToText(array: ProductPacking[], pkg: boolean): string {
    let result = '';
    if (pkg) {
      array.forEach((e, i) => {
        result += i > 0 ? ' / ' + e.productsPerPackage : e.productsPerPackage;
      });
    } else {
      array.forEach((e, i) => {
        result += i > 0 ? ' / ' + e.productsPerBox : e.productsPerBox;
      });
    }
    return result;
  }

}