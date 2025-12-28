import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableDeliveriesPageRoutingModule } from './available-deliveries-routing.module';

import { AvailableDeliveriesPage } from './available-deliveries.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableDeliveriesPageRoutingModule,
    ComponentModule
  ],
  declarations: [AvailableDeliveriesPage]
})
export class AvailableDeliveriesPageModule {}
