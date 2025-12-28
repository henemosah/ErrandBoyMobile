/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthErrorCodes } from 'firebase/auth';
import { UtilService } from 'src/app/services/util.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //registerForm: FormGroup;
  
  constructor(
    public util: UtilService,
    public authService: AuthenticationService,
    public router: Router,
    private firestore: AngularFirestore,
    private fb: FormBuilder
  ) { 

    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   userType: ['client', Validators.required]
    // });
    
  }

  ngOnInit() {
  }

  userType = 'client';
  register(userName: any, email: any, password: any, phone_number: any) {

    // if (this.registerForm.valid) {

    // }

    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        //Call APi for user registration
        this.util.registerUser(email.value, res.user?.uid, userName.value)
          .subscribe(data => {
            console.log(data);
          }

          );

        this.firestore.collection('users').doc(res.user?.uid).set({
          email: email.value,
          userType: this.userType,
          phoneNumber: phone_number.value,
          displayName: userName.value
        });

        this.authService.SendVerificationMail()
        window.alert('Registration Successful!!');
        //this.router.navigate(['verify-email']);
        this.router.navigate(['login']);
      })
      .catch((error) => {

        if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
          window.alert('Incorrect email or password');
        } else {
          window.alert(error.message);
        }
      });
  }
  onHome() {
    this.util.navigateRoot('/home');
  }

  onBack() {
    this.util.onBack();
  }

}
