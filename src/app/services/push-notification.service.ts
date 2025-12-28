import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    this.afMessaging.requestToken.pipe().subscribe( //take(1)
      token => console.log('Notification permission granted. Token:', token),
      error => console.error('Error getting permission:', error)
    );
  }

  listenForMessages() {
    this.afMessaging.messages.subscribe(payload => {
      console.log('Message received:', payload);
      alert('New Notification: ' + JSON.stringify(payload));
    });
  }
}