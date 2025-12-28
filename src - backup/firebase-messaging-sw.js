// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }

importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

firebase.initializeApp({
  // get this from Firebase console, Cloud messaging section
  'messagingSenderId': '291533970948'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('Received background message ', payload);
  // here you can override some options describing what's in the message; 
  // however, the actual content will come from the Webtask
  const notificationTitle = "Background message title"
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/assets/images/logo-128.png'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
});