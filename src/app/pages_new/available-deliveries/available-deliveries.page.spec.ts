import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableDeliveriesPage } from './available-deliveries.page';

describe('AvailableDeliveriesPage', () => {
  let component: AvailableDeliveriesPage;
  let fixture: ComponentFixture<AvailableDeliveriesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvailableDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
