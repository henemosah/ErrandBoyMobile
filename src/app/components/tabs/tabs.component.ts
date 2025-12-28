/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() navigation: string;
  userType: any = '';
  
  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.navigation);
    
    this.userType = localStorage.getItem('userType') || '';
    
  }

  async onNavigate(name: string) {
    if (name == 'orders') {
      const alert = await this.alertController.create({
        header: 'View Orders',
        message: `You can view your pending errands on the "Home" page. Do you want to proceed to view your orders?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Yes',
            handler: async () => {

              this.util.navigateRoot('home');
            }
          }
        ]
      });

      await alert.present();
    }
    else {
      this.util.navigateRoot(name);
    }
  }
}
