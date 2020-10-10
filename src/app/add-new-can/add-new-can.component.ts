import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-add-new-can',
  templateUrl: './add-new-can.component.html',
  styleUrls: ['./add-new-can.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AddNewCanComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  srcResult: any;
  dateType: string = 'MHD';

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      produktName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      produktTyp: ['GEKAUFT', Validators.required],
      date: [new Date, Validators.required]
    });
  }

  get produktName(){
    return this.firstFormGroup.controls['produktName'];
  }

  get produktTyp(){
    return this.secondFormGroup.controls['produktTyp'];
  }

  get date(){
    return this.secondFormGroup.controls['date'];
  }

  defineDateType(){
    if(this.secondFormGroup.controls['produktTyp'].value===CanType.EINGEKOCHT){
        this.dateType='Einkochdatum'
    }
    else {
      this.dateType = 'MHD'
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

        reader.readAsDataURL(inputNode.files[0]); // read file as data url

        reader.onload = (e: any) => {
          this.srcResult = e.target.result;
        };

    }
  }

}

export enum CanType {
  EINGEKOCHT = 'EINGEKOCHT',
  GEKAUFT = 'GEKAUFT'
}