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
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

import { Firestore, collection, query, orderBy, limit, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading: boolean = false;
  user: any;
  loading: boolean = false;

  userType = 'client';
  showLoginPanel: boolean = false;
  constructor(
    public util: UtilService,
    public authService: AuthenticationService,
    public router: Router,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController
  ) {

    this.initializeApp();
  }

  async initializeApp() {

    //--this.generateDeliveryJson();
    const loading = await this.loadingController.create({
      message: 'Checking authentication...',
      spinner: 'crescent'
    });
    await loading.present();

    this.afAuth.authState.subscribe(async user => {
      if (user) {

        this.firestore.collection('users').doc(user?.uid).get().subscribe(async doc => {
          const data = doc.data() as { userType?: string } | undefined;;
          
          if (data?.userType === 'client') {

            localStorage.setItem('userType', data.userType);

            this.authService.setUserType(data.userType);
            this.authService.setUid(this.user?.uid);
            this.authService.setEmail(this.user?.email);//setEmail

            this.router.navigate(['/home']);
          }
          else if (data?.userType === 'officer') {
            localStorage.setItem('userType', data.userType);

            this.authService.setUserType(data.userType);
            this.authService.setUid(this.user?.uid);//setEmail
            this.authService.setEmail(this.user?.email);//setEmail

            this.router.navigate(['/available-deliveries']);
          }
          this.showLoginPanel = true;
          await loading.dismiss();
        });

      }
      this.showLoginPanel = true;
      await loading.dismiss();
    });

  }
  ngOnInit() {
  }

  logIn(email: any, password: any, userType: any) {
    this.loading = true;

    this.authService
      .SignIn(email.value, password.value)
      .then((): any => {
        // const loading = await this.loadingController.create({
        //   message: 'Checking authentication...',
        //   spinner: 'crescent'
        // });
        // await loading.present();
        // if (this.authService.isEmailVerified) {
        //   this.router.navigate(['dashboard']);
        // } else {
        //   window.alert('Email is not verified');
        //   return false;
        // }
        this.user = this.authService.userData;
        /*   this.util.registerUser(email.value, this.user?.uid, email.value)
             .subscribe(data => {
               console.log(data);
             }
   
             );
   */
        this.loading = false;
        this.firestore.collection('users').doc(this.user?.uid).get().subscribe(async doc => {
          const data = doc.data() as { userType?: string } | undefined;;
          
          localStorage.setItem('userType', data?.userType || '');

          if (data?.userType !== userType.value) {
            this.loading = false;
            window.alert("You have not signed up as a '" + data?.userType + "' user!! -- " + userType.value);
          }
          else if (data?.userType === 'client') {

            this.authService.setUserType(data.userType);
            this.authService.setUid(this.user?.uid);
            this.authService.setEmail(this.user?.email);//setEmail

            //await loading.dismiss();
            this.router.navigate(['/home']);
          }
          else if (data?.userType === 'officer') {

            this.authService.setUserType(data.userType);
            this.authService.setUid(this.user?.uid);//setEmail
            this.authService.setEmail(this.user?.email);//setEmail

            //await loading.dismiss();
            this.router.navigate(['/available-deliveries']);
          } else {
            console.log('User type not found');
          }

          //await loading.dismiss();
        });
        //this.util.navigateRoot('/home');
      })
      .catch(async (error) => {
        this.loading = false;
        window.alert(error.message);
      });
  }
  onHome() {
    this.util.navigateRoot('/home');
  }

  async generateDeliveryJson(){

    const snapshot = await this.firestore.collection('deliveries', ref =>
      ref.orderBy('timestamp', 'desc').limit(15)
    ).get().toPromise();

    const deliveries: any[] = [];
    snapshot?.forEach(doc => {
      console.log(doc.data());
      deliveries.push({ doc });
    });
    console.log(deliveries);
    const blob = new Blob([JSON.stringify(deliveries, null, 2)], { type: 'application/json' });


    console.log('✅ Exported latest 15 deliveries successfully');

  }
  logInAsGuest() {
    //ClearCache
    this.authService.ClearCache();
    //SignInAnonymously

    let anonUser = this.authService.userData;
    console.log(anonUser);

    this.util.navigateRoot('/home');

    this.authService
      .SignInAnonymously()
      .then((): any => {
        anonUser = this.authService.userData;
        console.log(anonUser);
      })
      .catch((error) => {
        window.alert(error.message);
      });


  }
  onBack() {
    this.util.onBack();
  }

  onReset() {
    this.util.navigateToPage('reset-password');
  }

  onRegister() {
    this.util.navigateToPage('register');
  }

}
