/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Velle Chat This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonModal, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';

import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

// import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
// import { Platform } from '@ionic/angular';
// import { ChatExtraModalPage } from '../chat-extra-modal/chat-extra-modal.page';

interface Message {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  timestamp_str: string;
  delivery_id: any;
};

interface DisplayMessage {
  attachment: Attachment[];
  type: string,
  text: string,
  from: string,
  timestamp?: string,
  sender_name: string,
  to: string
}

interface Attachment {
  type: string;
  payload: Payload;
  caption: string;
}

interface Payload {
  url: string;
}
@Component({
  selector: 'app-inbox-driver',
  templateUrl: './inbox-driver.page.html',
  styleUrls: ['./inbox-driver.page.scss'],
})
export class InboxDriverPage implements OnInit {
  //////////////////////

  @ViewChild('map', { static: false }) map!: GoogleMap;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  estimatedTime: string = '';
  elapsedTime: string = '0s';
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;

  driverLocation = { lat: 37.7749, lng: -122.4194 }; // Sample Driver Location
  destinationLocation = { lat: 37.7849, lng: -122.4094 }; // Sample Destination Location

  private deliveryStartTime: Date = new Date();
  private requestStartTime: Date = new Date();
  private timerInterval: any;
  //////
  parseFloat = parseFloat;

  driverLocationSub?: Subscription;

  messages$: Message[];
  delivery_id: any;
  tmpMessage: Observable<Message[]>;

  messagesToView: DisplayMessage[] = [];

  newMessage: string = '';
  session: string = '';
  currentUser: string | null = '3NSjwOEC2bMQ3ZDdUNAqFqXD2tw1';//'hassan.goflikk@outlook.com';
  selectedUser: string = '';// 'N72dgl1zzPSIaOrk6PYtsP8lIDk2';// 'h.enemosah@gmail.com'; // User to chat with

  foods: any[] = [];
  loadMessages() {
    if (!this.currentUser || !this.selectedUser) return;

    // this.messages$ = this.firestore.collection<Message>('messages', ref =>
    //   ref.where('sender', 'in', [this.currentUser, this.selectedUser])
    //     .where('receiver', 'in', [this.currentUser, this.selectedUser])
    //     .orderBy('timestamp')
    // ).valueChanges();

    this.firestore.collection<Message>('messages', ref =>
      ref.where('sender', 'in', [this.currentUser, this.selectedUser])
        .where('receiver', 'in', [this.currentUser, this.selectedUser])
        .where('delivery_id', '==', this.delivery_id)
        .orderBy('timestamp')
    ).valueChanges()
      .subscribe(value => {
        this.messages$ = value;
        console.log(this.messages$);

        this.messagesToView = [];

        this.messages$.forEach(element => {
          let currentMessage = {
            "type": "text",
            "text": element.content,
            "timestamp_str": element.timestamp,
            "from": element.sender,
            "sender_name": "Michel Slatter",
            "to": element.receiver,
            "attachment": []
          };
          this.messagesToView.push(currentMessage);

        });

        setTimeout(() => {
          this.content.scrollToBottom(10);
        }, 500);

      });

    // this.firestore.collection('rentplace').valueChanges()
    //   .subscribe(value => console.log(value[0]));

    //--debugger;
  }

  async sendMessage() {
    console.log('Message:' + this.newMessage);
    console.log('currentUser:' + this.selectedUser);
    console.log('selectedUser:' + this.currentUser);

    if (this.newMessage.trim() === '' || !this.currentUser || !this.selectedUser) return;

    await this.firestore.collection('messages').add({
      sender: this.currentUser,
      receiver: this.selectedUser,
      content: this.newMessage,
      timestamp: new Date(),
      delivery_id: this.delivery_id
    });

    this.newMessage = '';
  }

  //////////
  @ViewChild('chatModal', { static: false }) chatModal!: IonModal;

  openChatModal() {
    this.chatModal.present();
  }

  closeChatModal() {
    this.chatModal.dismiss();
  }
  @ViewChild(IonContent) content: IonContent;
  name: any = '';
  cover: any = '';
  client_name: any = '';
  delivery: any;
  today = new Date();

  delivery_img: any = "";

  currentDelivery: any;

  constructor(
    public util: UtilService,
    public route: ActivatedRoute,
    private modalController: ModalController,
    private fns: AngularFireFunctions,
    private afAuth: AngularFireAuth, private firestore: AngularFirestore,
    private ngZone: NgZone,
    //private platform: Platform
  ) {

    // this.directionsRenderer = new google.maps.DirectionsRenderer();
    // this.directionsService = new google.maps.DirectionsService();

    this.foods = this.util.services;//.foods[0]['foods'];

    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      console.log(data.delivery);

      if (data && data.id && data.delivery_id) {
        
        this.delivery_id = data.delivery_id;
        this.delivery = JSON.parse(data.delivery);
        this.delivery_img = this.getRandomIconImage();

        this.currentUser = this.delivery.driver_id;
        this.selectedUser = this.delivery.clientID;

        this.deliveryStartTime = new Date(this.delivery.timestamp.seconds * 1000);
        //this.requestStartTime =  new Date(this.delivery.start_time.seconds);
        console.log(this.deliveryStartTime);
        this.firestore.collection('users').doc(this.selectedUser).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string } | undefined;

          this.client_name = data?.displayName;

        });
        //Get Client name
        //requesterCenter
        //driver_location


        this.selectedUser = this.delivery.clientID;
        this.currentUser = this.delivery.driver_id;

        this.driverLocation = this.delivery.driver_location;
        console.log(this.driverLocation);
        this.destinationLocation = this.delivery.requesterCenter;
        console.log(this.destinationLocation);

        console.log('data.delivery_id: ' + data.delivery_id);

        const info = this.util.userList[data.id];
        console.log(info);
        if (info && info.name) {
          this.name = info.name;
          this.cover = info.image;
          setTimeout(() => {
            this.content.scrollToBottom(10);
          }, 500);
        }

        
      }
    });
  }
  async CompleteErrand(delivery: any) {

    const now = new Date().getTime();
    const requestedTime = new Date(delivery.timestamp.seconds * 1000).getTime();
    const elapsedHours = Math.floor((now - requestedTime) / (30 * 60 * 1000));
    const elapsedMinutes = Math.floor((now - requestedTime) / (60 * 1000));

    let calculatedAmount = (delivery.baseFee + (elapsedMinutes*20));
    calculatedAmount = calculatedAmount < delivery.baseFee ? delivery.baseFee : calculatedAmount;

    const maxAmount = 5000;

    calculatedAmount = calculatedAmount > maxAmount ? maxAmount : calculatedAmount;
    const timestamp = new Date();
    this.firestore.collection('deliveries').doc(this.delivery.id).update({
      status: 'completed',
      total_price: calculatedAmount,
      finished_time: timestamp,
    });

    // 3️⃣ Trigger Firebase Function to send email
    const sendEmail = this.fns.httpsCallable('sendCompletionEmail');
    await sendEmail({
      to: delivery.clientEmail || 'customer@example.com',
      subject: `Delivery Completed - ${delivery.delivery_no}`,
      delivery_no: delivery.delivery_no,
      description: delivery.description,
      dropoff: delivery.dropoff,
      totalFee: calculatedAmount,
      driverName: delivery.driver_name,
      driverPhone: delivery.driver_phone_number
    }).toPromise();
  
    const toast = document.createElement('ion-toast');
    toast.message = `Errand #${delivery.delivery_no} completed successfully. Email sent to customer.`;
    toast.duration = 3500;
    toast.color = 'success';
    document.body.appendChild(toast);
    await toast.present();

    this.util.navigateRoot('/available-deliveries');

  }
  getRandomIconImage() {
    return this.foods[Math.floor(Math.random() * this.foods.length)].category_image;
    //item.category_image
  }
  calculateFee(delivery: any) {
    const now = new Date().getTime();
    const requestedTime = new Date(delivery.timestamp.seconds * 1000).getTime();
    const elapsedHours = Math.floor((now - requestedTime) / (30 * 60 * 1000));
    const elapsedMinutes = Math.floor((now - requestedTime) / (60 * 1000));

    let calculatedAmount = (delivery.baseFee);
    if (elapsedMinutes>30 && delivery.status=='accepted'){
      calculatedAmount = (delivery.baseFee + (elapsedMinutes*20));
    }
    calculatedAmount = calculatedAmount < delivery.baseFee ? delivery.baseFee : calculatedAmount;

    const maxAmount = 5000;

    return calculatedAmount > maxAmount ? maxAmount : calculatedAmount;
  }

  
// ===== REAL-TIME DRIVER LOCATION UPDATES =====
subscribeToDriverLocation(deliveryId: string) {
  // this.driverLocationSub = this.firestore.collection('deliveries').doc(deliveryId)
  //   .valueChanges()
  //   .subscribe((doc: any) => {
  //     if (doc?.driver_location) {
  //       this.updateMapMarker(doc.driver_location.lat, doc.driver_location.lng);
  //     }
  //   });
}


// Update Google Map marker
updateMapMarker(lat: number, lng: number) {
  if (this.map) {
    this.map.panTo({ lat, lng });
    // if (this.driverMarker) {
    //   this.driverMarker.setPosition({ lat, lng });
    // } else {
    //   this.driverMarker = new google.maps.Marker({
    //     position: { lat, lng },
    //     map: this.map,
    //     title: 'Driver Location'
    //   });
    // }
  }
}
  ionViewDidEnter() {
    /*
    if (this.platform.is('capacitor')) {
      Keyboard.addListener('keyboardWillShow', () => {
        setTimeout(() => this.scrollToBottom(), 300);
      });
      Keyboard.addListener('keyboardWillHide', () => {
        setTimeout(() => this.scrollToBottom(), 300);
      });
    }*/
  }

  scrollToBottom() {
    const content = document.querySelector('ion-content');
    if (content && (content as any).scrollToBottom) {
      (content as any).scrollToBottom(300);
    }
  }

  selectedTab: string = 'map';
  async ngOnInit() {
    // this.afAuth.authState.subscribe(user => {
    //   this.currentUser = user ? user.uid : null;
    //   this.loadMessages();
    // });
    /*
    if (this.platform.is('capacitor')) {
      Keyboard.setScroll({ isDisabled: true }); // Prevent Ionic auto scroll
      Keyboard.setResizeMode({ mode: KeyboardResize.Ionic }); // Resize webview height
    }*/

    this.center = this.driverLocation;

    this.startTimer();

    this.loadMessages();

    for (let index = 0; index < 10; index++) {
      //console.log('Step: ', index);
      ;//this.newMessage = 'message to send ' + index;

      //--   await this.sendMessage();
    }
  }

  ngAfterViewInit() {
    if ((window as any).google) {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsService = new google.maps.DirectionsService();

      this.directionsRenderer.setMap(this.map.googleMap!);
      this.calculateRoute();
    } else {
      console.error('Google Maps JS API not loaded');
    }
    // this.directionsRenderer.setMap(this.map.googleMap!);
    // this.calculateRoute();
  }

  calculateRoute() {
    const request: google.maps.DirectionsRequest = {
      origin: this.driverLocation,
      destination: this.destinationLocation,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        this.ngZone.run(() => {
          this.directionsRenderer.setDirections(result);
          const leg = result.routes[0].legs[0];
          this.estimatedTime = leg.duration?.text || '';
        });
      }
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - this.deliveryStartTime.getTime()) / 1000);

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      let parts: any = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

      this.ngZone.run(() => {
        this.elapsedTime = parts.join(' ');
      });

    }, 1000);
  }

  ngOnDestroy() {
    this.driverLocationSub?.unsubscribe();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  getalldate(startDate: any, endDate: any) {
    return (new Date(endDate).getTime() - new Date(startDate).getTime()) / 60000;
  }
  onCall() {

  }
  onBack() {
    this.util.onBack();
  }

  onEmoji() {
    console.log('emoji button');
  }

  async DoSendMessage() {

    await this.sendMessage();
    this.newMessage = "";
  }
  async onMoreButtons() {
    // const modal = await this.modalController.create({
    //   component: ChatExtraModalPage,
    //   cssClass: 'chat-extra-buttons'
    // });
    // await modal.present();
  }
}
