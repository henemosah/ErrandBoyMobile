/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, Injector, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { FilterPage } from '../filter/filter.page';
import { SearchPage } from '../search/search.page';
import { NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { CallService } from 'src/app/services/call.service';


export interface Notification {
  userId: string;
  message: string;
  deliveryId: string;
  timestamp: Date;
  read: boolean;
}

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOptsBanners = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
  };

  slideOptsCategories = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 15,
  };

  foods: any[] = [];
  userID: any;
  username: any = "Default User";

  today = new Date();
  deliveries: any[];
  pendingDeliveries: any[]; //accepted


  deliveriesCount: number = 0;
  unreadCount: number = 0;
  notifications: Notification[];

  //private callService: CallService;

  constructor(
    public util: UtilService,
    private afAuth: AngularFireAuth,
    public authService: AuthenticationService,
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private analytics: AngularFireAnalytics,
    private injector: Injector,
    // private callService: CallService
  ) {
    this.foods = this.util.services;//.foods[0]['foods'];


    console.log(this.foods);
  }
  
  getalldate(startDate: any, endDate: any) {
    return (new Date(endDate).getTime() - new Date(startDate).getTime()) / 60000;
  }
  errandDetails(delivery: any) {

    try {

      let num = 3;
      let type = 'chat';
      const param1: NavigationExtras = {
        queryParams: {
          id: num,
          chat: type,
          delivery: JSON.stringify(delivery),
          delivery_id: delivery.id,
          delivery_uid: delivery.uid
        }
      };
      this.util.navigateToPage('inbox', param1);
    } catch (error) {
      alert(error);
    }

    // this.firestore.collection('deliveries').doc(delivery.id).update({
    //   status: 'accepted',
    //   driver: { id: 'driver123', name: 'John Doe', phone_number: '+234-XXXX-XXX', driver_uid: 'xxx-xxxxx-xxxxxxxx' }, // Replace with actual driver details
    //   start_time: timestamp
    // });
  }
  // async startCall() {
  //   const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //   const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
  //   localVideo.srcObject = localStream;
  //   localVideo.play();

  //   const callId = 'your-call-id'; // Generate dynamically or via Firestore
  //   const isInitiator = true; // Toggle this for caller/callee
  //   await this.callService.initCall(localStream, callId, isInitiator);
  // }
  
  cancelErrand(delivery: any) {
    this.firestore.collection('deliveries').doc(delivery.id).update({
      status: 'cancelled',
      //driver: { id: 'driver123', name: 'John Doe' } // Replace with actual driver details
    });
  }
  ngOnInit() {
    
    //this.callService = this.injector.get(CallService); 

    this.afAuth.authState.subscribe(user => {
      //this.username = user?.displayName;
      if (user) {
        this.userID = user?.uid;
        this.firestore.collection('users').doc(user?.uid).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string } | undefined;

          this.username = data?.displayName;

          this.analytics.logEvent('Home - User', {
            name: 'home_page_cta - ' + this.username,
            time: new Date().toISOString(),

          });
          this.firestore.collection('deliveries', ref => ref.where('clientID', '==', this.userID).where('status', '==', 'available')).valueChanges({ idField: 'id' })
            .subscribe(value => {
              this.deliveries = value;

              console.log(this.deliveries);
              // this.deliveriesCount = this.deliveries.length
            });
          this.firestore.collection('deliveries', ref => ref.where('clientID', '==', this.userID).where('status', '==', 'accepted')).valueChanges({ idField: 'id' })
            .subscribe(value => {
              this.pendingDeliveries = value;
            });

          this.firestore.collection('notifications', ref =>
            ref.where('userId', '==', user?.uid).orderBy('timestamp', 'desc')
          ).valueChanges({ idField: 'id' }).subscribe((notifications: any[]) => {
            this.notifications = notifications;
            this.unreadCount = notifications.filter(n => !n.read).length;
          });
        });
      }
    });


  }
  getRandomIconImage() {
    return this.foods[Math.floor(Math.random() * this.foods.length)].category_image;
    //item.category_image
  }
  randomIntFromInterval(min: number, max: number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  calculateFee(delivery: any) {
    const now = new Date().getTime();
    const requestedTime = new Date(delivery.timestamp.seconds * 1000).getTime();
    const elapsedHours = Math.floor((now - requestedTime) / (30 * 60 * 1000));

    let calculatedAmount = (delivery.baseFee * (elapsedHours / 2));
    const maxAmount = 5000;

    return calculatedAmount > maxAmount ? maxAmount : calculatedAmount;

    return delivery.baseFee + elapsedHours * 2;
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'filter-modal'
    });
    await modal.present();
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data == 'navigate') {
        this.onFoodInfo(this.foods[1]['name'], this.foods[1]['image']);
      }
    });
    await modal.present();
  }

  onFoodInfo(name: string, cover: string) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        cover: cover
      }
    };
    //this.util.navigateToPage('food-info', param);
    // this.util.navigateToPage('chats', param);

    let num = 3;
    let type = 'chat';
    const param1: NavigationExtras = {
      queryParams: {
        id: num,
        chat: type
      }
    };
    this.util.navigateToPage('inbox', param1);
  }

  requestDelivery() {
    //request-delivery
    let num = 3;
    let type = 'chat';
    const param1: NavigationExtras = {
      queryParams: {
        id: num,
        chat: type
      }
    };
    this.util.navigateToPage('request-delivery', param1);
  }
  availableDeliveries() {
    this.util.navigateToPage('available-deliveries');
  }
  byCategories(name: string) {
    alert('Coming Soon');
    return;
    const param: NavigationExtras = {
      queryParams: {
        name: name
      }
    };
    this.util.navigateToPage('by-categories', param);
  }

  onCategories() {
    alert('Coming Soon');
    return;
    this.util.navigateToPage('categories');
  }

}
