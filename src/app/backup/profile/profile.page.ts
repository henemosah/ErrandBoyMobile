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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: any = "";
  email: any = "";

  today = new Date();

  userID: any;

  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    public authService: AuthenticationService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      //this.username = user?.displayName;
      if (user) {
        this.userID = user?.uid;
        this.email = user?.email;
        this.firestore.collection('users').doc(user?.uid).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string } | undefined;

          this.username = data?.displayName;


        });
      }
    });
  }

  onPage(name: string) {
    this.util.navigateToPage(name);
  }

}
