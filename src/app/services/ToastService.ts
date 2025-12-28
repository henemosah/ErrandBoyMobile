import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async show(message: string, color: string = 'primary', duration: number = 2500) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'middle', // 'top' or 'middle' or 'bottom' also works
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
