import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestDeliveryPage } from './request-delivery.page';

describe('RequestDeliveryPage', () => {
  let component: RequestDeliveryPage;
  let fixture: ComponentFixture<RequestDeliveryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestDeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
