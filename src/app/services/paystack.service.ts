import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaystackService {

  private paystackPublicKey ='pk_test_9821d7ff73ab540bd6616211867042112a36504c';// 'YOUR_PAYSTACK_PUBLIC_KEY';
  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  initiatePayment(email: string, amount: number) {
    const paystackUrl = 'https://api.paystack.co/transaction/initialize';
    return this.http.post(paystackUrl, {
      email,
      amount: amount * 100, // Convert to kobo
      public_key: this.paystackPublicKey,
    });
  }

  verifyPayment(reference: string) {
    return this.http.get(`https://api.paystack.co/transaction/verify/${reference}`);
  }
}
