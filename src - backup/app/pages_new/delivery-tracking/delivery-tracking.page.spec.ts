import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryTrackingPage } from './delivery-tracking.page';

describe('DeliveryTrackingPage', () => {
  let component: DeliveryTrackingPage;
  let fixture: ComponentFixture<DeliveryTrackingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeliveryTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
