import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Product } from '@models/product';

import productsFromFile from '@data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    products: Product[] = productsFromFile;

    constructor() { }
  
    getAll(): Observable<Product[]> {
      return of(this.products);
    }
  
    get(id: string): Observable<Product> {
      return of(this.products).pipe(
        map(result => result.find(x => x.id == id)!)
      );
    }
  
    getByGrupoId(grupoId: string): Observable<Product[]> {
      return of(this.products).pipe(
        map(result => result.filter(x => x.grupoId === grupoId))
      );
    }
  
    getNews(): Observable<Product[]> {
      return of(this.products).pipe(
        map(result => result.filter(x => x.isNew))
      );
    }
  
}