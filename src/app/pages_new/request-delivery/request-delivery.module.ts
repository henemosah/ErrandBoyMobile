import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComponentModule } from 'src/app/components/component.module';

import { IonicModule } from '@ionic/angular';

import { RequestDeliveryPageRoutingModule } from './request-delivery-routing.module';

import { RequestDeliveryPage } from './request-delivery.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    ComponentModule,
    IonicModule,
    RequestDeliveryPageRoutingModule
  ],
  declarations: [RequestDeliveryPage]
})
export class RequestDeliveryPageModule {}
