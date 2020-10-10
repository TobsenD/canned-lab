import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { CanType } from '../cantypes';
import { Product } from '../model/product';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

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
  eingekocht: Product[];
  gekauft: Product[];
  displayedColumns: string[] = ['name', 'typ', 'canDate', 'mhdDate', 'menge', 'action'];
  displayedCanColumns: string[] = ['name', 'typ', 'canDate', 'menge', 'action'];
  displayedBuyColumns: string[] = ['name', 'typ', 'mhdDate', 'menge', 'action'];
  expandedElement: Product | null;
  breakpoint: number = 1;

  constructor(private breakpointObserver: BreakpointObserver, private productService: ProductsService, private router: Router) {}

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.gekauft = products.filter(product => product.typ===CanType.GEKAUFT);
      this.eingekocht = products.filter(product => product.typ===CanType.EINGEKOCHT);
    });


  }

  ngOnInit(){
    this.getProducts();
    this.breakpoint = (window.innerWidth <= 1024) ? 1 : 2;
    console.log(this.breakpoint)
  }

  onResize(event) {
    console.log(event.target.innerWidth)
    this.breakpoint = (event.target.innerWidth <= 1024) ? 1 : 2;
    console.log(this.breakpoint)
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

  delete(element){
    element.menge=0;
    this.productService.deleteProduct(element).subscribe(() => {
      this.getProducts();
    });
  }

  edit(element){
    this.router.navigateByUrl('/dashboard/'+element.id)
  }

  toggleExpand(event, row){
    if(event.srcElement.id!=="btn"){
      this.expandedElement = this.expandedElement === row ? null : row
    }
  }

  triggerWarning(row){
    console.log("Waring: " + (new Date(row.mhdDate)<=new Date()) )
    return (new Date(row.mhdDate)<=new Date());
  }

}
