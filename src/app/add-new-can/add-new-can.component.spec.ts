import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCanComponent } from './add-new-can.component';

describe('AddNewCanComponent', () => {
  let component: AddNewCanComponent;
  let fixture: ComponentFixture<AddNewCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
