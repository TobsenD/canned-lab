import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { CanType } from '../cantypes';
import { Product } from '../model/product';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

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
export class DashboardComponent implements OnInit {

  products: Product[];
  eingekocht: Product[];
  gekauft: Product[];
  displayedColumns: string[] = ['name', 'typ', 'canDate', 'mhdDate', 'menge', 'action'];
  displayedCanColumns: string[] = ['name', 'typ', 'canDate', 'mhdDate', 'menge', 'action'];
  displayedBuyColumns: string[] = ['name', 'typ', 'mhdDate', 'menge', 'action'];
  expandedElement: Product | null;
  breakpoint = 1;

  constructor(private breakpointObserver: BreakpointObserver, private productService: ProductsService, private router: Router) {}

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.gekauft = products.filter(product => product.typ === CanType.GEKAUFT);
      this.eingekocht = products.filter(product => product.typ === CanType.EINGEKOCHT);
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.breakpoint = (window.innerWidth <= 1024) ? 1 : 2;
    console.log(this.breakpoint);
  }

  onResize(event): void {
    console.log(event.target.innerWidth);
    this.breakpoint = (event.target.innerWidth <= 1024) ? 1 : 2;
    console.log(this.breakpoint);
  }

  clickSubstract(element): void {
    element.menge = element.menge - 1;
    if (element.menge > 0){
      this.productService.updateProduct(element).subscribe(product => {
        this.products.push(product);
      });
    } else {
      this.productService.deleteProduct(element).subscribe(() => {
        this.getProducts();
      });
    }
  }

  clickAdd(element): void {
    element.menge = element.menge + 1;
    this.productService.updateProduct(element).subscribe(product => {
      this.products.push(product);
    });
  }

  delete(element): void {
    element.menge = 0;
    this.productService.deleteProduct(element).subscribe(() => {
      this.getProducts();
    });
  }

  edit(element): void {
    this.router.navigateByUrl('/detail/' + element.id);
  }

  toggleExpand(event, row): void {
    if (event.srcElement.id !== 'btn'){
      this.expandedElement = this.expandedElement === row ? null : row;
    }
  }

  triggerWarning(row): boolean{
    return (new Date(row.mhdDate) <= new Date());
  }

}
