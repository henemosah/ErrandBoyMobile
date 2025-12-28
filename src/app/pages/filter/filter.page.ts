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

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  selected: any = 'menu';
  priceLbl = '1';
  savedCategories: any[] = [];
  constructor(
    private modalController: ModalController,
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  changeLbl(num: any) {
    this.priceLbl = num;
  }

  changeFilter(name: any) {
    this.selected = name;
  }

  saveCategories(name: any) {
    if (this.savedCategories.includes(name)) {
      this.savedCategories = this.savedCategories.filter(x => x != name);
    } else {
      this.savedCategories.push(name);
    }
  }
}
