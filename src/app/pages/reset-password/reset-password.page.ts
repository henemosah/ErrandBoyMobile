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
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  currentDiv: any = 1;
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onVerify() {
    this.currentDiv = 2;
  }

  onVerifyOtp() {
    this.currentDiv = 3;
  }

  onBack() {
    this.util.onBack();
  }

}
