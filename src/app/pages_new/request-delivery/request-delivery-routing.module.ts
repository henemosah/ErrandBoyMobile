import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestDeliveryPage } from './request-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: RequestDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestDeliveryPageRoutingModule {}
