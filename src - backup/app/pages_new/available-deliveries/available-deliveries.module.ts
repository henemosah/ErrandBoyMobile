import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableDeliveriesPageRoutingModule } from './available-deliveries-routing.module';

import { AvailableDeliveriesPage } from './available-deliveries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableDeliveriesPageRoutingModule
  ],
  declarations: [AvailableDeliveriesPage]
})
export class AvailableDeliveriesPageModule {}
