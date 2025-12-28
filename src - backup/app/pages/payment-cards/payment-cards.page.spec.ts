/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCardsPage } from './payment-cards.page';

describe('PaymentCardsPage', () => {
  let component: PaymentCardsPage;
  let fixture: ComponentFixture<PaymentCardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
