import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProductsService } from '../products.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: Product[];

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit(){
    this.getProducts();
  }

  constructor(private breakpointObserver: BreakpointObserver, private productService: ProductsService) {}
}
