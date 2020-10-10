import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './model/product'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const products: Product[] = [
      {
        id: 1,
      name: "Test",
      image: null,
      typ: "EINGEKOCHT",
      date: new Date()
    }, {
      id: 2,
      name: "Test2",
      image: null,
      typ: "EINGEKOCHT",
      date: new Date()
      }];
    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
