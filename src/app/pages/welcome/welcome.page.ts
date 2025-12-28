/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';

register();
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>
  activeIndex: any = 0;
  isEnd: boolean = false;
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  changed() {
    this.activeIndex = this.swiper?.nativeElement.swiper.activeIndex;
    if (this.swiper?.nativeElement.swiper.isEnd) {
      this.isEnd = true;
    }
  }

  onAuth() {
    this.util.navigateRoot('/auth');
  }

}
