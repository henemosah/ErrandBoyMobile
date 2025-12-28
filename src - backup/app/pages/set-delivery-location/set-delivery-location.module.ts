/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetDeliveryLocationPageRoutingModule } from './set-delivery-location-routing.module';

import { SetDeliveryLocationPage } from './set-delivery-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetDeliveryLocationPageRoutingModule
  ],
  declarations: [SetDeliveryLocationPage]
})
export class SetDeliveryLocationPageModule { }
