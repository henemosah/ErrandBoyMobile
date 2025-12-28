import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailableDeliveriesPage } from './available-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableDeliveriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableDeliveriesPageRoutingModule {}
