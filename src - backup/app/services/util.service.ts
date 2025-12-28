/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading = false;
  banners: any[] = [
    "assets/images/banners/1.png",
    // "assets/images/banners/2.png",
    // "assets/images/banners/3.png",
    // "assets/images/banners/4.png",
    // "assets/images/banners/5.png",
    // "assets/images/banners/6.png",
  ];

  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT"
    })
  };
  registerUser(email: any, UUID: any, displayName: any): Observable<any> {
    let postUrl = environment.errandboy_engine_url + 'api/registerUser'; // Make a correct URl to get response from server.

    postUrl += "?email=" + email;
    postUrl += "&UUID=" + UUID;
    postUrl += "&displayName=" + displayName;

    return this.http.get<any>(postUrl, this.httpHeader) //Post method with params and PostUrl
      .pipe(
        tap((_) => console.log('FlikkUser Added!')),
        catchError(this.handleError<any>('Get News Item', []))
      );
  };

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  categories: any[] = [
    {
      "name": "Cleaning",
      "image0": "assets/images/categories/cleaner.png",
      "image": "assets/images/categories/cleaning-tools.gif"
    },
    {
      "name": "Repairing",
      "image0": "assets/images/categories/repair.png",
      "image": "assets/images/categories/under-construction.gif"
    },
    {
      "name": "Painting",
      "image0": "assets/images/categories/paint-roller.png",
      "image": "assets/images/categories/work-in-progress.gif"
    },
    {
      "name": "Laundry",
      "image0": "assets/images/categories/washing-machine.png",
      "image": "assets/images/categories/laundry.gif"
    },
    {
      "name": "Plumbing",
      "image0": "assets/images/categories/plumber.png",
      "image": "assets/images/categories/plunger.gif"
    },
    {
      "name": "Others",
      "image0": "assets/images/categories/fast-delivery.png",
      "image": "assets/images/categories/delivery-courier.gif"
    },
  ];

  randomIntFromInterval(min: number, max: number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  services: any[] = [
    {
      "image": "assets/images/avatar/1.jpg",
      "name": "Richard G. Oneal",
      "service": "Drywall Installation",
      "price": "125.22",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/2.jpg",
      "name": "Floyd M. Helton",
      "service": "Fixture Replacement",
      "price": "253.66",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/3.jpg",
      "name": "Matthew M. Hernandez",
      "service": "Smart Home Upgrade Installation",
      "price": "563.99",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/4.jpg",
      "name": "Candice M. Coffey",
      "service": "Painting for the Interior and Exterior",
      "price": "525.77",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/5.jpg",
      "name": "Terrie R. Cobb",
      "service": "Power Washing",
      "price": "714.22",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/6.jpg",
      "name": "Clarissa C. Wentz",
      "service": "Tile Installation",
      "price": "951.33",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/7.jpg",
      "name": "Shirley J. Arnold",
      "service": "Window Repair",
      "price": "753.66",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/8.jpg",
      "name": "Jack R. Applegate",
      "service": "Small Appliance Repair",
      "price": "951.55",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/9.jpg",
      "name": "Anita T. Ross",
      "service": "Interior stain and paint",
      "price": "852.66",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/10.jpg",
      "name": "Dianna K. Wadley",
      "service": "Drywall repair",
      "price": "896.88",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/11.jpg",
      "name": "Rodney R. Ruddy",
      "service": "Plumbing",
      "price": "874.66",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/12.jpg",
      "name": "Deanna B. Mull",
      "service": "Electrical tasks",
      "price": "956.99",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/13.jpg",
      "name": "Michael C. Phelan",
      "service": "Window coverings",
      "price": "513.88",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/14.jpg",
      "name": "Lorraine S. Jones",
      "service": "Carpentry jobs",
      "price": "963.66",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/15.jpg",
      "name": "Philip J. Watson",
      "service": "Babyproofing",
      "price": "512.33",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/16.jpg",
      "name": "Patricia R. James",
      "service": "Tiling",
      "price": "953.44",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/17.jpg",
      "name": "Dena C. Fernandez",
      "service": "Winterization",
      "price": "745.99",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/18.jpg",
      "name": "Troy S. Gaines",
      "service": "Home upgrades",
      "price": "856.99",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/19.jpg",
      "name": "Robin K. Miller",
      "service": "Door Hardware",
      "price": "784.55",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
    {
      "image": "assets/images/avatar/20.jpg",
      "name": "Willie K. Rothermel",
      "service": "Gutter cleaning",
      "price": "963.88",
      "rate": "4.8",
      "total_rate": "8,536",
      "image_index": this.randomIntFromInterval(0,6),
      "category_image": this.categories[this.randomIntFromInterval(0,5)].image
    },
  ];

  foods: any[] = [
    {
      "name": "Appetizers",
      "foods": [
        {
          "name": "Bruschetta",
          "image": "assets/images/products/Bruschetta-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Calamari",
          "image": "assets/images/products/Calamari-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Chicken wings",
          "image": "assets/images/products/chicken-w.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "mozzarella sticks",
          "image": "assets/images/products/mozzarella.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "artichoke dip",
          "image": "assets/images/products/artichoke.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Shrimp",
          "image": "assets/images/products/Shrimp-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Nachos",
          "image": "assets/images/products/Nachos-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Spring rolls",
          "image": "assets/images/products/spring.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Hummus",
          "image": "assets/images/products/Hummus-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "pita bread",
          "image": "assets/images/products/pita.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
      ]
    },
    {
      "name": "Entrees",
      "foods": [
        {
          "name": "Steak",
          "image": "assets/images/products/Steak-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Seafood",
          "image": "assets/images/products/Seafood-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Chicken",
          "image": "assets/images/products/Chicken-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Pasta",
          "image": "assets/images/products/Pasta-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Burgers",
          "image": "assets/images/products/Burgers-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Sandwiches",
          "image": "assets/images/products/Sandwiches-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Tacos",
          "image": "assets/images/products/Tacos-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Stir-fry",
          "image": "assets/images/products/Stir-fry-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Pizza",
          "image": "assets/images/products/Pizza-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Lasagna",
          "image": "assets/images/products/Lasagna-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
      ]
    },
    {
      "name": "Sides",
      "foods": [
        {
          "name": "French fries",
          "image": "assets/images/products/french.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Sweet potato fries",
          "image": "assets/images/products/sweet.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Onion rings",
          "image": "assets/images/products/onion.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Garlic bread",
          "image": "assets/images/products/garlics.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Mashed potatoes",
          "image": "assets/images/products/mashed.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Baked potato",
          "image": "assets/images/products/backed.jpg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Grilled vegetables",
          "image": "assets/images/products/grilled.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Rice",
          "image": "assets/images/products/Rice-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Side salad",
          "image": "assets/images/products/side.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
      ]
    },
    {
      "name": "Desserts",
      "foods": [
        {
          "name": "Cheesecake",
          "image": "assets/images/products/Cheesecake-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Chocolate cake",
          "image": "assets/images/products/chokolate.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Apple pie",
          "image": "assets/images/products/apple-pia.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Ice cream sundae",
          "image": "assets/images/products/ice-creames.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Creme brulee",
          "image": "assets/images/products/creme.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Tiramisu",
          "image": "assets/images/products/Tiramisu-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Bread pudding",
          "image": "assets/images/products/bread.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Brownie sundae",
          "image": "assets/images/products/brownie-s.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Fruit sorbet",
          "image": "assets/images/products/fruites.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
      ]
    },
    {
      "name": "Beverages",
      "foods": [
        {
          "name": "Soft drinks",
          "image": "assets/images/products/soft.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Juice",
          "image": "assets/images/products/Juice-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Iced tea",
          "image": "assets/images/products/ice-team.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Lemonade",
          "image": "assets/images/products/Lemonade-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Coffee",
          "image": "assets/images/products/Coffee-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Tea",
          "image": "assets/images/products/Tea-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Beer",
          "image": "assets/images/products/Beer-min.jpg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Wine",
          "image": "assets/images/products/Wine-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
        {
          "name": "Coca-Cola",
          "image": "assets/images/products/Coca-Cola-min.jpeg",
          "price": ".99",
          "rate": "4.5"
        },
      ]
    },
  ];

  sizes: any[] = [
    "Regular",
    "Medium",
    "Large",
    "Full"
  ];

  variations: any[] = [
    "No Tomoto",
    "No Lettuce",
    "No Ketchup",
    "No Onion",
    "Buttermilk",
    "Signature souces",
    "Mustard",
    "Mayonnaise",
    "Aioli",
    "Barbecue Sauce"
  ];

  messages: any[] = [
    {
      "type": "text",
      "text": "Hello Steve",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Hi Michael",
      "from": "jid_1111",
      "sender_name": "Steve Jobs",
      "to": "jid_1109"
    },
    {
      "type": "text",
      "text": "Check this below destination",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "attachment": [{
        "type": "image",
        "payload": {
          "url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg"
        },
        "caption": "Chennai"
      }],
      "type": "image",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Can  you send few more",
      "from": "jid_1111",
      "sender_name": "Steve Jobs",
      "to": "jid_1109"
    },
    {
      "type": "text",
      "text": "Here are few more travel destinations around europe, united states of america, japan, southern america, south africa, congo, sri lanka, west indies, green land and australia",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "attachment": [
        {
          "type": "image",
          "payload": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Bachalpsee_reflection.jpg"
          },
          "caption": "Japan"
        },
        {
          "type": "image",
          "payload": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg"
          },
          "caption": "southern america, northern america, western america, eastern america"
        },
        {
          "type": "image",
          "payload": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/7/73/KERALA_-_32.jpg"
          },
          "caption": "Kerala"
        },
        {
          "type": "image",
          "payload": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Top_of_Atmosphere.jpg"
          },
          "caption": ""
        }
      ],
      "type": "image",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Hello Steve",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Hi Michael",
      "from": "jid_1111",
      "sender_name": "Steve Jobs",
      "to": "jid_1109"
    },
    {
      "type": "text",
      "text": "Check this below destination",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Hello Steve",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Hi Michael",
      "from": "jid_1111",
      "sender_name": "Steve Jobs",
      "to": "jid_1109"
    },
    {
      "type": "text",
      "text": "How you doing?",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Lets go outside",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "type": "text",
      "text": "Ok",
      "from": "jid_1111",
      "sender_name": "Steve Jobs",
      "to": "jid_1109"
    },
    {
      "type": "text",
      "text": "Check this below destination",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
    {
      "attachment": [{
        "type": "image",
        "payload": {
          "url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg"
        },
        "caption": "Chennai"
      }],
      "type": "image",
      "from": "jid_1109",
      "sender_name": "Michel Slatter",
      "to": "jid_1111"
    },
  ];


  userList: any[] = [
    {
      "image": "assets/images/avatar/1.jpg",
      "name": "Richard G. Oneal"
    },
    {
      "image": "assets/images/avatar/2.jpg",
      "name": "Floyd M. Helton"
    },
    {
      "image": "assets/images/avatar/3.jpg",
      "name": "Matthew M. Hernandez"
    },
    {
      "image": "assets/images/avatar/4.jpg",
      "name": "Candice M. Coffey"
    },
    {
      "image": "assets/images/avatar/5.jpg",
      "name": "Terrie R. Cobb"
    },
    {
      "image": "assets/images/avatar/6.jpg",
      "name": "Clarissa C. Wentz"
    },
    {
      "image": "assets/images/avatar/7.jpg",
      "name": "Shirley J. Arnold"
    },
    {
      "image": "assets/images/avatar/8.jpg",
      "name": "Jack R. Applegate"
    },
    {
      "image": "assets/images/avatar/9.jpg",
      "name": "Anita T. Ross"
    },
    {
      "image": "assets/images/avatar/10.jpg",
      "name": "Dianna K. Wadley"
    },
    {
      "image": "assets/images/avatar/11.jpg",
      "name": "Rodney R. Ruddy"
    },
    {
      "image": "assets/images/avatar/12.jpg",
      "name": "Deanna B. Mull"
    },
    {
      "image": "assets/images/avatar/13.jpg",
      "name": "Michael C. Phelan"
    },
    {
      "image": "assets/images/avatar/14.jpg",
      "name": "Lorraine S. Jones"
    },
    {
      "image": "assets/images/avatar/15.jpg",
      "name": "Philip J. Watson"
    },
    {
      "image": "assets/images/avatar/16.jpg",
      "name": "Patricia R. James"
    },
    {
      "image": "assets/images/avatar/17.jpg",
      "name": "Dena C. Fernandez"
    },
    {
      "image": "assets/images/avatar/18.jpg",
      "name": "Troy S. Gaines"
    },
    {
      "image": "assets/images/avatar/19.jpg",
      "name": "Robin K. Miller"
    },
    {
      "image": "assets/images/avatar/20.jpg",
      "name": "Willie K. Rothermel"
    },
  ];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private zone: NgZone,
    private http: HttpClient,
  ) {

  }

  changeMenuItems(action: boolean) {
    this.menuCtrl.enable(action);
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

  navigateToPage(routes: any, param?: NavigationExtras | undefined) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }

  navigateRoot(routes: any | string) {
    this.zone.run(() => {
      this.navCtrl.navigateRoot([routes]);
    });
  }

  getKeys(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.getItem(key))
    });
  }

  clearKeys(key: string) {
    // this.storage.remove(key);
    localStorage.removeItem(key);
  }

  setKeys(key: string, value: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    });
  }

  async show(msg?: string | null) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg && msg != '' && msg != null ? msg : '',
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */
  async showWarningAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSimpleAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email: string) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: 'Please enter valid email',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }


  /*
    Show Toast Message on Screen
     param : msg = message to display, color= background
     color of toast example dark,danger,light. position  = position of message example top,bottom
     Call this method to show toast message
     */

  async showToast(msg: any, colors: any, positon: any) {


    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  async shoNotification(msg: any, colors: any, positon: any) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  async errorToast(msg: any, color?: string | (string & Record<never, never>) | undefined) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'danger',
      position: 'top'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  onBack() {
    this.navCtrl.back();
  }

  makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
