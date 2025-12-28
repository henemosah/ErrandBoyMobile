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
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './shared/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  username: any = "Default User";
  email: any = "Default Email";

  activePage = ''; // ✅ Track currently active route

  appPages = [
    { title: 'Home', route: 'home', icon: 'home-outline', userType : 'client' },
    { title: 'Home.', route: 'available-deliveries', icon: 'home', userType : 'officer' },
    { title: 'Profile', route: 'profile', icon: 'person-outline', userType : 'both' },
    { title: 'Order History', route: 'orders', icon: 'receipt-outline', userType : 'client' },
    { title: 'Notifications', route: 'notifications', icon: 'notifications-outline', userType : 'client' },
    { title: 'My Addresses', route: 'my-address', icon: 'location-outline', userType : 'client' },
    { title: 'Privacy Policy', route: 'privacy', icon: 'shield-checkmark-outline', userType : 'both' },
    { title: 'Terms & Conditions', route: 'terms', icon: 'document-text-outline', userType : 'both' },
  ];
  
  filteredPages: any[] = [];

  activeDeliveries = 4;
  availableDeliveries = 12; 
  completedDeliveries = 18;
  totalDeliveries = 2;
  statsGraph = [40, 60, 80, 30, 50, 70]; // sample bar chart data

  userType: any = '';

  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
    public router: Router,
  ) { 

  }

  ngOnInit() {
    
    //this.callService = this.injector.get(CallService); 

    this.userType = localStorage.getItem('userType') || '';

    this.afAuth.authState.subscribe(user => {
      //this.username = user?.displayName;
      if (user) {
        this.firestore.collection('users').doc(user?.uid).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string, userType?: string } | undefined;

          this.username = data?.displayName;
          this.email = user?.email;
            
         // this.userType = data?.userType;
          
          this.filteredPages = this.appPages.filter(page =>
              page.userType == this.userType || page.userType == 'both')
        });
      }
    });


  }
  onPage(name: any) {
    this.util.navigateRoot(name);
    this.activePage = name; // Set immediately when clicked
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
