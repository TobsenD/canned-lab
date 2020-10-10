import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';
import { Product } from './model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts() : Observable<Product[]>{
    return of(PRODUCTS);
  }
}
