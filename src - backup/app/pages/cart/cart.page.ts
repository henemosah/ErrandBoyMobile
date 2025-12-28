/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilService } from 'src/app/services/util.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  foods: any[] = [];
  
  username: any = "Default User";

  pendingDeliveries: any[]; //accepted
  currentDelivery: any; //accepted

  userID: any;

  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    public authService: AuthenticationService,
    private firestore: AngularFirestore
  ) {
    this.foods = this.util.foods[0]['foods'];
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      //this.username = user?.displayName;
      if (user) {
        this.userID = user?.uid;
        this.firestore.collection('users').doc(user?.uid).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string } | undefined;

          this.username = data?.displayName;
          
            this.firestore.collection('deliveries', ref => ref.where('clientID', '==', this.userID).where('status', '==', 'accepted')).valueChanges({ idField: 'id' })
              .subscribe(value => {
                this.pendingDeliveries = value;
                if (this.pendingDeliveries.length>0) {
                  this.currentDelivery = this.pendingDeliveries[0];
                }
              });

        });
      }
    });
  }

  onPayment() {
    this.util.navigateToPage('payments');
  }

}
