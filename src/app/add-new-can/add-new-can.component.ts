import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Product } from '../model/product';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';
import { CanType } from '../cantypes';


@Component({
  selector: 'app-add-new-can',
  templateUrl: './add-new-can.component.html',
  styleUrls: ['./add-new-can.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddNewCanComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  srcResult: any;
  showCan = false;
  products: Product[];

  constructor(private formBuilder: FormBuilder, private productService: ProductsService, private location: Location) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      produktName: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      produktTyp: [CanType.GEKAUFT, Validators.required],
      canDate: [new Date()],
      mhdDate: [new Date(new Date().setMonth(new Date().getMonth() + 8)), Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      menge: [1, Validators.required]
    });
    this.getProducts();
  }

  get produktName(): AbstractControl {
    return this.firstFormGroup.controls['produktName'];
  }

  get produktTyp(): AbstractControl {
    return this.secondFormGroup.controls['produktTyp'];
  }

  get mhdDate(): AbstractControl  {
    return this.secondFormGroup.controls['mhdDate'];
  }

  get canDate(): AbstractControl  {
    return this.secondFormGroup.controls['canDate'];
  }

  get menge(): AbstractControl {
    return this.thirdFormGroup.controls['menge'];
  }

  get mhdDateString(): string  {
    return new Date(this.mhdDate.value).toLocaleDateString();
  }

  get canDateString(): string {
    return new Date(this.canDate.value).toLocaleDateString();
  }

  checkMenge(): boolean {
    if (parseInt(this.menge.value, 10) > 0) {
      return false;
    }
    return true;
  }

  defineDateType = (): void => {
    if (this.secondFormGroup.controls['produktTyp'].value === CanType.EINGEKOCHT) {
      this.showCan = true;
    }
    else {
      this.showCan = false;
    }
  }

  onFileSelected = (): void =>  {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.readAsDataURL(inputNode.files[0]); // read file as data url

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

    }
  }

  submitProduct(): void {
    const mhdDate = new Date(this.mhdDate.value);
    mhdDate.setUTCHours(0, 0, 0, 0);

    let canDate = null;
    if (this.showCan) {
      canDate = new Date(this.canDate.value);
      canDate.setUTCHours(0, 0, 0, 0);
    }

    this.productService.addProduct(
      { name: this.produktName.value,
        image: this.srcResult,
        typ: this.produktTyp.value,
        canDate,
        mhdDate,
        menge: this.menge.value
      } as Product
      ).subscribe(product => {
      this.products.push(product);
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  goBack(): void {
    this.location.back();
  }


}
