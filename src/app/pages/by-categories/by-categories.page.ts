/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-by-categories',
  templateUrl: './by-categories.page.html',
  styleUrls: ['./by-categories.page.scss'],
})
export class ByCategoriesPage implements OnInit {
  name: any = '';
  foods: any[] = [];
  constructor(
    public util: UtilService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      this.name = data.name;
      this.foods = this.util.services;// .foods[0]['foods'];
    });
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
