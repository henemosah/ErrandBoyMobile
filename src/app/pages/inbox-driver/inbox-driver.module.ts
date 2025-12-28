/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Velle Chat This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxDriverPageRoutingModule } from './inbox-driver-routing.module';

import { GoogleMapsModule } from '@angular/google-maps';

import { InboxDriverPage } from './inbox-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxDriverPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [InboxDriverPage]
})
export class InboxDriverPageModule { }
