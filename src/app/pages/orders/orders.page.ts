/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  foods: any[] = [];
  constructor(
    public util: UtilService
  ) {
    this.foods = this.util.foods[0]['foods'];
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

}
