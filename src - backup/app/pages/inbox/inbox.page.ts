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
import { IonContent, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
// import { ChatExtraModalPage } from '../chat-extra-modal/chat-extra-modal.page';

interface Message {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  delivery_id: any;
};

interface DisplayMessage {
  attachment: Attachment[];
  type: string,
  text: string,
  from: string,
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
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
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
  private timerInterval: any;
  //////
  parseFloat = parseFloat;

  messages$: Message[];
  delivery_id: any;
  tmpMessage: Observable<Message[]>;

  messagesToView: DisplayMessage[] = [];

  newMessage: string = '';
  session: string = '';
  currentUser: string | null = '3NSjwOEC2bMQ3ZDdUNAqFqXD2tw1';//'hassan.goflikk@outlook.com';
  selectedUser: string | null = 'N72dgl1zzPSIaOrk6PYtsP8lIDk2';// 'h.enemosah@gmail.com'; // User to chat with

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
    console.log('currentUser:' + this.currentUser);
    console.log('selectedUser:' + this.selectedUser);

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
  @ViewChild(IonContent) content: IonContent;
  name: any = '';
  cover: any = '';
  delivery: any;
  today = new Date();

  delivery_img: any = "";

  currentDelivery: any;
  selectedTab: string = 'main';

  constructor(
    public util: UtilService,
    public route: ActivatedRoute,
    private modalController: ModalController,
    private afAuth: AngularFireAuth, private firestore: AngularFirestore,
    private ngZone: NgZone
  ) {

    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();

    this.foods = this.util.services;//.foods[0]['foods'];

    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      console.log(data.delivery);

      if (data && data.id && data.delivery_id) {

        this.firestore.collection('deliveries').doc(data.delivery_id).valueChanges().subscribe(data => {
          this.currentDelivery = data;
        });

        this.delivery_id = data.delivery_id;
        this.delivery = JSON.parse(data.delivery);
        this.delivery_img = this.getRandomIconImage();
        //requesterCenter
        //driver_location
        this.deliveryStartTime = new Date(this.delivery.start_time.seconds * 1000);

        this.driverLocation = this.delivery.driver_location;
        this.destinationLocation = this.delivery.requesterCenter;

        this.currentUser = this.delivery.clientID;
        this.selectedUser = this.delivery.driver_id;

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

  getRandomIconImage() {
    return this.foods[Math.floor(Math.random() * this.foods.length)].category_image;
    //item.category_image
  }
  calculateFee(delivery: any) {
    const now = new Date().getTime();
    const requestedTime = new Date(delivery.timestamp.seconds * 1000).getTime();
    const elapsedHours = Math.floor((now - requestedTime) / (30 * 60 * 1000));

    let calculatedAmount = (delivery.baseFee * (elapsedHours / 2));
    const maxAmount = 5000;

    return calculatedAmount > maxAmount ? maxAmount : calculatedAmount;
  }
  async ngOnInit() {
    // this.afAuth.authState.subscribe(user => {
    //   this.currentUser = user ? user.uid : null;
    //   this.loadMessages();
    // });

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
    this.directionsRenderer.setMap(this.map.googleMap!);
    this.calculateRoute();
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
