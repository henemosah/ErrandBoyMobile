/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Velle Chat This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';

register();

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>
  @ViewChild(IonContent) content: IonContent;
  currentItem: any = 'chat';
  chatChanged: boolean = false;
  chatLoader: boolean = false;
  chatDisplay: boolean = false;

  groupChanged: boolean = false;
  groupLoader: boolean = false;
  groupDisplay: boolean = false;

  callChanged: boolean = false;
  callLoader: boolean = false;
  callDisplay: boolean = false;

  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    console.log(event);
    const changed = event.detail.value;
    if (changed == 'chat') {
      this.swiper?.nativeElement.swiper.slideTo(0);
      this.content.scrollToTop(10);
    } else if (changed == 'group') {
      this.swiper?.nativeElement.swiper.slideTo(1);
      this.content.scrollToTop(10);
    } else if (changed == 'calls') {
      this.swiper?.nativeElement.swiper.slideTo(2);
      this.content.scrollToTop(10);
    }
  }

  slideChanged(event: any) {
    const data = this.swiper?.nativeElement.swiper.activeIndex;
    if (data == 0) {
      this.currentItem = 'chat';
    } else if (data == 1) {
      this.currentItem = 'group';
    } else if (data == 2) {
      this.currentItem = 'calls';
    }
  }

  onChatChanged() {
    this.chatLoader = true;
    this.chatChanged = true;
    // this.onNetworkError('chat');
    
        setTimeout(() => {
          this.chatLoader = false;
          this.chatDisplay = true;
        }, 1000);
  }

  onGroupChanged() {
    this.groupChanged = true;
    this.groupLoader = true;
    setTimeout(() => {
      this.groupLoader = false;
      this.groupDisplay = true;
    }, 1000);
  }

  onCallChanged() {
    this.callChanged = true;
    this.callLoader = true;
    setTimeout(() => {
      this.callLoader = false;
      this.callDisplay = true;
    }, 1000);
  }

  // async onNetworkError(type: string) {
  //   const modal = await this.modalController.create({
  //     component: NetworkIssuePage,
  //     cssClass: 'network-issue'
  //   });

  //   modal.onDidDismiss().then((data: any) => {
  //     if (type == 'chat') {
  //       setTimeout(() => {
  //         this.chatLoader = false;
  //         this.chatDisplay = true;
  //       }, 1000);
  //     }
  //   });
  //   await modal.present();
  // }

  onInbox(num: number, type: string) {
    const param: NavigationExtras = {
      queryParams: {
        id: num,
        chat: type
      }
    };
    this.util.navigateToPage('inbox', param);
  }
}
