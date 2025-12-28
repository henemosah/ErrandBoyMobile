import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KycFormPage } from './kyc-form.page';

describe('KycFormPage', () => {
  let component: KycFormPage;
  let fixture: ComponentFixture<KycFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KycFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
