/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
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

  onFoodInfo(name: string, cover: string) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        cover: cover
      }
    };
    this.util.navigateToPage('food-info', param);
  }

}
