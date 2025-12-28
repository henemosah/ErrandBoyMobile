/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { FilterPage } from '../filter/filter.page';
import { SearchPage } from '../search/search.page';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  foods: any[] = [];
  currentOffer: any = 'offer';
  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) {
    this.foods = this.util.foods[0]['foods'];
  }


  changeOffer(name: any) {
    this.currentOffer = name;
  }

  ngOnInit() {
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
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        cover: cover
      }
    };
    this.util.navigateToPage('food-info', param);
  }

  byCategories(name: string) {
    const param: NavigationExtras = {
      queryParams: {
        name: name
      }
    };
    this.util.navigateToPage('by-categories', param);
  }

}
