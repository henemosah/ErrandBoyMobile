/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessPaymentsPage } from './success-payments.page';

describe('SuccessPaymentsPage', () => {
  let component: SuccessPaymentsPage;
  let fixture: ComponentFixture<SuccessPaymentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
