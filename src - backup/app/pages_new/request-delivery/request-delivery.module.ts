import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { IonicModule } from '@ionic/angular';

import { RequestDeliveryPageRoutingModule } from './request-delivery-routing.module';

import { RequestDeliveryPage } from './request-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    IonicModule,
    RequestDeliveryPageRoutingModule
  ],
  declarations: [RequestDeliveryPage]
})
export class RequestDeliveryPageModule {}
