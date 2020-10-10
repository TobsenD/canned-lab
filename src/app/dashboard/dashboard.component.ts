import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent {

  products: Product[];
  displayedColumns: string[] = ['id', 'name', 'typ', 'date', 'menge'];
  expandedElement: Product | null;

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit(){
    this.getProducts();
  }

  clickSubstract(element){
    element.menge=element.menge-1;
    if(element.menge>0){
      this.productService.updateProduct(element).subscribe(product => {
        this.products.push(product);
      });
    } else {
      this.productService.deleteProduct(element).subscribe(() => {
        this.getProducts();
      });
    }
  }

  clickAdd(element){
    element.menge=element.menge+1;
    this.productService.updateProduct(element).subscribe(product => {
      this.products.push(product);
    });
  }

  toggleExpand(event, row){
    if(event.srcElement.id!=="btn"){
      this.expandedElement = this.expandedElement === row ? null : row
    }

  }

  constructor(private breakpointObserver: BreakpointObserver, private productService: ProductsService) {}
}
