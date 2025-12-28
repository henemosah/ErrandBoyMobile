/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Foodies-3 FoodDon This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  // },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-new-address',
    loadChildren: () => import('./pages/add-new-address/add-new-address.module').then(m => m.AddNewAddressPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'by-categories',
    loadChildren: () => import('./pages/by-categories/by-categories.module').then(m => m.ByCategoriesPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./pages/favourite/favourite.module').then(m => m.FavouritePageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterPageModule)
  },
  {
    path: 'food-info',
    loadChildren: () => import('./pages/food-info/food-info.module').then(m => m.FoodInfoPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
  },
  {
    path: 'inbox-driver',
    loadChildren: () => import('./pages/inbox-driver/inbox-driver.module').then(m => m.InboxDriverPageModule)
  },
  {
    path: 'location-map',
    loadChildren: () => import('./pages/location-map/location-map.module').then(m => m.LocationMapPageModule)
  },
  {
    path: '', //login
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login', //
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'my-address',
    loadChildren: () => import('./pages/my-address/my-address.module').then(m => m.MyAddressPageModule)
  },
  {
    path: 'new-payment-card',
    loadChildren: () => import('./pages/new-payment-card/new-payment-card.module').then(m => m.NewPaymentCardPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'payment-cards',
    loadChildren: () => import('./pages/payment-cards/payment-cards.module').then(m => m.PaymentCardsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'set-delivery-location',
    loadChildren: () => import('./pages/set-delivery-location/set-delivery-location.module').then(m => m.SetDeliveryLocationPageModule)
  },
  {
    path: 'success-payments',
    loadChildren: () => import('./pages/success-payments/success-payments.module').then(m => m.SuccessPaymentsPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/verification/verification.module').then(m => m.VerificationPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'write-reviews',
    loadChildren: () => import('./pages/write-reviews/write-reviews.module').then(m => m.WriteReviewsPageModule)
  },
  {
    path: 'write-reviews',
    loadChildren: () => import('./pages/write-reviews/write-reviews.module').then(m => m.WriteReviewsPageModule)
  },
  {
    path: 'request-delivery',
    loadChildren: () => import('./pages_new/request-delivery/request-delivery.module').then( m => m.RequestDeliveryPageModule)
  },
  {
    path: 'delivery-tracking/:id',
    loadChildren: () => import('./pages_new/delivery-tracking/delivery-tracking.module').then( m => m.DeliveryTrackingPageModule)
  },
  {
    path: 'available-deliveries',
    loadChildren: () => import('./pages_new/available-deliveries/available-deliveries.module').then( m => m.AvailableDeliveriesPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages_new/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'kyc-form',
    loadChildren: () => import('./pages/kyc-form/kyc-form.module').then( m => m.KycFormPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
