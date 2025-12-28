import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';

import { NavigationExtras } from '@angular/router';
import { firstValueFrom, map, Observable, take } from 'rxjs';

import { PushNotificationService } from 'src/app/services/push-notification.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-available-deliveries',
  templateUrl: './available-deliveries.page.html',
  styleUrls: ['./available-deliveries.page.scss'],
})
export class AvailableDeliveriesPage implements OnInit {

  deliveries: any[];
  pendingDeliveries: any[]; //accepted
  thisDeliveries$: any[];

  deliveriesCount: number = 0;
  sampleCount = 14;
  foods: any[] = [];

  userID: any;
  username: any = "Default User";
  phoneNumber: any = '';

  currentLocation = 'Fetching location...';
  center: google.maps.LatLngLiteral | null = null;

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public util: UtilService,
    private pushService: PushNotificationService) {

    this.foods = this.util.services;//.foods[0]['foods'];
    this.getCurrentLocation();
  }

  ngOnInit() {
    //this.deliveries = 
    this.firestore.collection('deliveries', ref => ref.where('status', '==', 'available')).valueChanges({ idField: 'id' })
      .subscribe(value => {
        this.deliveries = value;
        this.deliveriesCount = this.deliveries.length
      });


    this.afAuth.authState.subscribe(user => {
      //this.username = user?.displayName;
      if (user) {
        this.userID = user?.uid;
        this.firestore.collection('users').doc(user?.uid).get().subscribe(doc => {
          const data = doc.data() as { displayName?: string, phoneNumber?: string } | undefined;

          this.username = data?.displayName;
          this.phoneNumber = data?.phoneNumber;

          this.firestore.collection('deliveries', ref => ref.where('driver_id', '==', this.userID).where('status', '==', 'accepted')).valueChanges({ idField: 'id' })
            .subscribe(value => {
              this.pendingDeliveries = value;
            });

        });
      }
    });

    // loop through deliveries and if status is pending and duration is more than 2 hours, set status to terminated and send message to original user

    this.monitorAndTerminateOldDeliveries();

    this.pushService.listenForMessages();
  }
  monitorAndTerminateOldDeliveries() {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 0.5 * 60 * 60 * 1000); // 2 hours ago/ 30 minuts

    this.firestore
      .collection('deliveries', ref =>
        ref.where('status', '==', 'available')
      )
      .valueChanges({ idField: 'id' }) // Include doc ID for updates
      //.pipe(take(1)) // Only take a snapshot once (not real-time listening)
      .subscribe(async (deliveries: any[]) => {
        for (const delivery of deliveries as any[]) {
          const timestamp: Timestamp = delivery.timestamp;
          const clientId: string = delivery.clientid;

          if (timestamp?.toDate() < cutoff) {
            const deliveryDocRef = this.firestore.doc(`deliveries/${delivery.id}`).ref;
            await deliveryDocRef.update({ status: 'terminated' });

            // Create in-app notification
            const notification = {
              userId: clientId,
              message: `Your delivery request (ID: ${delivery.id}) has been terminated due to inactivity.`,
              deliveryId: delivery.id,
              timestamp: Timestamp.now(),
              read: false,
            };

            console.log(`Your delivery request (ID: ${delivery.id}) has been terminated due to inactivity.`);
            await this.firestore.collection('notifications').add(notification);
            console.log(`Notification sent to ${clientId}`);
          }
        }
      });
  }
  
  errandDetails(delivery: any) {

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
    this.util.navigateToPage('inbox-driver', param1);

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
  acceptDelivery(delivery: any) {
    //if an errand is outstanding, then cannot go on another errand
    if (this.pendingDeliveries?.length > 0) {
      alert('Please complete your current Errand before accepting a new one.');
      //--return;
    }
    const timestamp = new Date();

    this.firestore.collection('deliveries').doc(delivery.id).update({
      status: 'accepted',
      //driver: { id: 'driver123', name: 'John Doe', phone_number: '+234-XXXX-XXX' }, // Replace with actual driver details
      driver_id: this.userID,
      driver_name: this.username,
      driver_phone_number: '+234' + this.phoneNumber,
      start_time: timestamp,
      driver_location: this.center,
    });


    alert('Errand Accepted');
    this.errandDetails(delivery);
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
    // const now = new Date().getTime();
    // const requestedTime = new Date(delivery.timestamp.seconds * 1000).getTime();
    // const elapsedHours = Math.floor((now - requestedTime) / (30 * 60 * 1000));
    // return delivery.baseFee + elapsedHours * 2;
  }

}
