importScripts("https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js", "https://www.gstatic.com/firebasejs/6.0.1/firebase-messaging.js")

firebase.initializeApp({messagingSenderId: "559509250006"});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    const notification = JSON.parse(payload.data.notification);
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body
    };
    //Show the notification :)
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });