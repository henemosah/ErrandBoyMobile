/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component } from '@angular/core';
import { UtilService } from './services/util.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  username: any = "Default User";
  email: any = "Default Email";

  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  onPage(name: any) {
    this.util.navigateRoot(name);
  }

  onSubPage(name: any) {
    this.util.navigateToPage(name);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
