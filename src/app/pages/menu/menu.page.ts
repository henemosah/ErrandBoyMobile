/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { FilterPage } from '../filter/filter.page';
import { NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  name: any = '';
  foods: any[] = [];
  userType: any = '';

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    public authService: AuthenticationService,
  ) {
    this.name = this.util.foods[0]['name'];
    this.foods = this.util.services;// .foods[0]['foods'];
    this.userType = this.authService.getUserType();
  }

  ngOnInit() {
  }

  segmentChanged() {
    console.log(this.name);
    const foods = this.util.foods.filter(x => x.name == this.name);
    console.log(foods);
    this.foods = foods[0]['foods'];
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'filter-modal'
    });
    await modal.present();
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data == 'navigate') {
        this.onFoodInfo(this.foods[1]['name'], this.foods[1]['image']);
      }
    });
    await modal.present();
  }

  onFoodInfo(name: string, cover: string) {
    alert('Coming Soon!!');
    return;
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        cover: cover
      }
    };
    this.util.navigateToPage('food-info', param);
  }

}
