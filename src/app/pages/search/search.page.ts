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
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  foods: any[] = [];
  constructor(
    private modalController: ModalController,
    public util: UtilService
  ) {
    this.foods = this.util.foods[0]['foods'];
  }

  ngOnInit() {
  }

  close(action: string, id: string) {
    this.modalController.dismiss(action, id);
  }

}
