import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { PaystackService } from 'src/app/services/paystack.service';

import { PushNotificationService } from 'src/app/services/push-notification.service';
import { UtilService } from 'src/app/services/util.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

interface Message {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
};

@Component({
  selector: 'app-request-delivery',
  templateUrl: './request-delivery.page.html',
  styleUrls: ['./request-delivery.page.scss'],
})
export class RequestDeliveryPage implements OnInit {

  cover: any = '';
  
  messages$: Message[];

  tmpMessage: Observable<Message[]>;
  newMessage: string = '';
  currentUser: string | null = '3NSjwOEC2bMQ3ZDdUNAqFqXD2tw1';//'hassan.goflikk@outlook.com';
  selectedUser: string | null = 'N72dgl1zzPSIaOrk6PYtsP8lIDk2';// 'h.enemosah@gmail.com'; // User to chat with

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
        .orderBy('timestamp')
    ).valueChanges()
    .subscribe(value=>this.messages$=value  );

    // this.firestore.collection('rentplace').valueChanges()
    //   .subscribe(value => console.log(value[0]));

    debugger;
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
      timestamp: new Date()
    });

    this.newMessage = '';
  }
  
  pickupAddress = '';
  deliveryAddress = '';
  baseFee = 500; // Initial delivery fee

  deliveryDescription = '';
  currentLocation = 'Fetching location...';
  clientID = 5;


  userId: string = '';
  email: string | null = '';
  center: google.maps.LatLngLiteral | null = null;

  constructor(
    private paystackService: PaystackService,
    private firestore: AngularFirestore,
    public util: UtilService,
    private afAuth: AngularFireAuth,
    public authService: AuthenticationService,
    private pushService: PushNotificationService) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.getCurrentLocation();
    this.email = this.authService.getEmail();

  }


  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, error => {
        this.currentLocation = 'Unable to retrieve location';
      });
    } else {
      this.currentLocation = 'Geolocation is not supported by this browser';
    }
  }
  generateDeliveryRef(): string {
    const now = new Date();
    const dateStr = now.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14); // e.g., 20250503-153000
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `DEL-${dateStr}-${randomSuffix}`;
  }
  requestDelivery() {
    const timestamp = new Date();
    this.firestore.collection('deliveries').add({
      pickup: this.pickupAddress,
      dropoff: this.deliveryAddress,

      description: this.deliveryDescription,
      status: 'available',
      baseFee: this.baseFee,
      timestamp: timestamp,
      requesterLocation: this.currentLocation,
      requesterCenter: this.center,
      clientID: this.userId,
      paymentType: 'CASH',
      delivery_no: this.generateDeliveryRef()
    }).then(() => {

      alert('Errand Request sent SUCCESSFULLY!!');
      this.pushService.requestPermission();

      this.util.navigateRoot('home');
      //navigate to home
    });
  }

  payForDelivery() {
    this.paystackService.initiatePayment(this.email ?? '', this.baseFee).subscribe((response: any) => {
      if (response.status) {
        window.open(response.data.authorization_url, '_blank');
        this.verifyPayment(response.data.reference);
      }
    });
  }

  verifyPayment(reference: string) {

    const timestamp = new Date();

    this.paystackService.verifyPayment(reference).subscribe((response: any) => {
      if (response.data.status === 'success') {
        this.firestore.collection('deliveries').add({
          pickup: this.pickupAddress,
          dropoff: this.deliveryAddress,

          description: this.deliveryDescription,
          //status: 'available',
          baseFee: this.baseFee,
          timestamp: timestamp,
          requesterLocation: this.currentLocation,
          clientID: this.userId,
          status: 'pending',
          paymentType: 'PAYSTACK'
        });
      }
    });
  }
  ngOnInit() { }
}
