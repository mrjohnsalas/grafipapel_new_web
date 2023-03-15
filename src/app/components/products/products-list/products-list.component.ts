import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '@models/product';
import { ProductService } from '@services/product.service';
import { ProductGroup } from '@models/product-group';
import { Router } from '@angular/router';

declare function initTabs(): any;
declare function initGoTo(): any;
declare function initStickyBlocks(): any;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit {

  objs!: Product[];
  objsFiltered!: Product[];
  objsFilteredPage!: Product[];
  productGroups!: ProductGroup[];
  productGroupSelected!: string;

  homePath = '/home';
  totalPages = 0;
  pages!: number[];
  currentPage = 1;
  maxItemsPerPage = 9;

  selectedGroupIdByRoute: string = '';

  constructor(private objService: ProductService, private router: Router) { 
    this.selectedGroupIdByRoute = this.router.getCurrentNavigation()?.extras.state?.['selectedGroupId'];
  }

  ngAfterViewInit(): void {
    initTabs();
    initGoTo();
    initStickyBlocks();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.objService.getAll().subscribe(
      obj => this.onSuccess(obj),
      error => this.onError(error),
      () => this.filterData());
  }

  onSuccess(obj: Product[]): void {
    this.objs = obj;
    this.getProductGroups();
  }

  getProductGroups() {
    if (this.objs) {
      this.productGroups = [];
      const map = new Map();
      for (const p of this.objs) {
          if(!map.has(p.grupoId)){
              map.set(p.grupoId, true);
              this.productGroups.push({id: p.grupoId, name: p.grupo });
          }
      }
      this.productGroups.unshift({id: 'F', name: "FOLDERS" })
      this.productGroups.unshift({id: 'S', name: "SOBRES" })
      this.productGroups = this.productGroups.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.productGroups.unshift({id: 'N', name: "NUEVOS PRODUCTOS" })
      this.productGroups.push({id: 'T', name: "TODOS" })

      let ix = 0;
      if (this.selectedGroupIdByRoute) {
        ix = this.productGroups.findIndex(g => g.id === this.selectedGroupIdByRoute);
      }
      this.productGroupSelected = this.productGroups[ix].id;
    }
  }

  setCurrentProductGroup(grupoId: string) {
    this.productGroupSelected = grupoId;
    this.filterData();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  
  filterData() {
    console.log('Load products completed');
    this.objsFiltered = this.objs;
    if (this.productGroupSelected) {
      switch (this.productGroupSelected) {
        case 'N':
          this.objsFiltered = this.objs.filter(obj => obj.isNew);
          break;
        case 'S':
          this.objsFiltered = this.objs.filter(obj => obj.claseId == '20');
          break;
        case 'F':
          this.objsFiltered = this.objs.filter(obj => obj.claseId == '21');
          break;
        case 'T':
          this.objsFiltered = this.objs;
          break;
        default: 
        this.objsFiltered = this.objs.filter(obj => obj.grupoId === this.productGroupSelected);
      }
    }
    this.totalPages = Math.ceil(this.objsFiltered.length / this.maxItemsPerPage) || 1;
    this.pages = [...Array(this.totalPages).keys()].map(i => i + 1);
    this.currentPage = 1;
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.currentPage = page;
    if (this.objsFiltered.length > this.maxItemsPerPage) {
      this.objsFilteredPage = this.objsFiltered.slice((this.currentPage - 1) * this.maxItemsPerPage, this.currentPage * this.maxItemsPerPage);
    } else {
      this.objsFilteredPage = this.objsFiltered;
    }
  }

  nextPage() {
    let nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.getPage(nextPage);
    }
  }

  previousPage() {
    let previousPage = this.currentPage - 1;
    if (previousPage >= 1) {
      this.getPage(previousPage);
    }
  }

  onError(errorResponse: HttpErrorResponse): void {
    console.error(errorResponse);
    this.router.navigate([this.homePath]);
  }

}