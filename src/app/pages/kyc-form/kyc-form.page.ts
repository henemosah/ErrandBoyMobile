import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { last, switchMap } from 'rxjs/operators';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.page.html',
  styleUrls: ['./kyc-form.page.scss'],
})
export class KycFormPage implements OnInit {

  currentTab: string = 'personal'; // Default tab

  kycForm: FormGroup;
  uid: string;

  idImageUrl = '';
  selfieUrl = '';

  loading = false;
  kycStatus: string = '';
  rejectionReason: string = '';

  countries = [
    'Nigeria','Ghana','Kenya','South Africa','United States',
    'United Kingdom','Canada','Germany','France','India'
  ];
  currentStep = 1;
  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  isStepInvalid() {
    if (this.currentStep === 1) {
      return this.kycForm.get('firstName')?.invalid || this.kycForm.get('lastName')?.invalid;
    }
    if (this.currentStep === 2) {
      return this.kycForm.get('address')?.invalid || this.kycForm.get('city')?.invalid;
    }
    return false;
  }
  disableSplitPane = false;
  
  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    const user = await this.auth.currentUser;
    this.uid = user?.uid || '';

    this.kycForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: [''],
    });

    this.loadExistingKyc();
  }

  loadExistingKyc() {
    this.afs.doc(`users/${this.uid}`).valueChanges().subscribe((user: any) => {
      if (!user) return;

      this.kycStatus = user?.kycStatus || '';
      this.rejectionReason = user?.rejectionReason || '';
      this.idImageUrl = user?.idImageUrl || '';
      this.selfieUrl = user?.selfieUrl || '';

      if (user.kycCompleted) {
        this.kycForm.patchValue(user);
      }
    });
  }

  uploadId(event: any) {
    const file = event.target.files[0];
    const path = `kyc/${this.uid}/id_${Date.now()}`;

    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    const fileRef = this.storage.ref(path);

    this.idImageUrl = path;
    alert('File uploaded');
    // this.storage.upload(path, file)
    //   .snapshotChanges()
    //   .pipe(
    //     last(),
    //     switchMap(() => fileRef.getDownloadURL())
    //   )
    //   .subscribe(url => {
    //     this.idImageUrl = url;
    //   });
  }

  uploadSelfie(event: any) {
    const file = event.target.files[0];
    const path = `kyc/${this.uid}/selfie_${Date.now()}`;

    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    
    const fileRef = this.storage.ref(path);

    this.selfieUrl = path;
    this.idImageUrl = path;

    alert('File uploaded');
    // this.storage.upload(path, file)
    //   .snapshotChanges()
    //   .pipe(
    //     last(),
    //     switchMap(() => fileRef.getDownloadURL())
    //   )
    //   .subscribe(url => {
    //     this.idImageUrl = url;
    //   });
  }

  ionViewWillEnter() {
    this.menu.enable(false);   // Disable side menu
  }

  ionViewWillLeave() {
    this.menu.enable(true);    // Re-enable when leaving
  }
  async submitKYC() {
    if (this.kycForm.invalid) {
      return this.showToast('Kindly complete all fields', 'danger');
    }

    // if (!this.idImageUrl || !this.selfieUrl) {
    //   return this.showToast('Upload ID and Selfie', 'danger');
    // }

    this.loading = true;

    await this.afs.doc(`users/${this.uid}`).update({
      ...this.kycForm.value,
      idImageUrl: this.idImageUrl,
      selfieUrl: this.selfieUrl,
      kycCompleted: true,
      kycStatus: 'pending',
      rejectionReason: '',
      updatedAt: new Date()
    });

    this.loading = false;
    this.showToast('KYC submitted successfully', 'success');
    this.navCtrl.navigateBack('/profile');
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      color,
      position: 'bottom'
    });

    toast.present();
  }
}
