import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PaystackService } from 'src/app/services/paystack.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  balance = 0;
  topUpAmount: number = 0;
  userId: string = '';
  email: string | null = '';

  constructor(
    private paystackService: PaystackService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadBalance();
      }
    });

    this.email = this.authService.getEmail();
  }
  ngOnInit(): void {

  }

  loadBalance() {
    this.firestore.collection('wallets').doc(this.userId).get().subscribe(doc => {
      if (doc.exists) {
        const data = doc.data() as { balance?: number } | undefined;
        this.balance = data?.balance || 0;
      }

    });
  }

  topUpWallet() {
    this.paystackService.initiatePayment(this.email ?? '', this.topUpAmount).subscribe((response: any) => {
      if (response.status) {
        window.open(response.data.authorization_url, '_blank');
        this.verifyPayment(response.data.reference);
      }
    });
  }

  verifyPayment(reference: string) {
    this.paystackService.verifyPayment(reference).subscribe((response: any) => {
      if (response.data.status === 'success') {
        this.firestore.collection('wallets').doc(this.userId).update({
          balance: this.balance + this.topUpAmount
        });
      }
    });
  }

}
