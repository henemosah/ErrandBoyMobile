import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { KycFormPageRoutingModule } from './kyc-form-routing.module';

import { KycFormPage } from './kyc-form.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    KycFormPageRoutingModule
  ],
  declarations: [KycFormPage]
})
export class KycFormPageModule {}
