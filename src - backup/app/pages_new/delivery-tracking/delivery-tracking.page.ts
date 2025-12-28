import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delivery-tracking',
  templateUrl: './delivery-tracking.page.html',
  styleUrls: ['./delivery-tracking.page.scss'],
})
export class DeliveryTrackingPage implements OnInit {

  deliveryId: string | undefined;
  delivery: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.deliveryId = this.route.snapshot.paramMap.get('id') || '{}';
    this.firestore.collection('deliveries').doc(this.deliveryId).valueChanges().subscribe(data => {
      this.delivery = data;
    });
  }

}
