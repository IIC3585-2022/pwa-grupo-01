
const configurePushSubscription = async () => {
  if ('serviceWorker' in navigator && "PushManager" in window) {
    let serviceWorkerRegistration;
    navigator.serviceWorker.ready
      .then(registration => {
        serviceWorkerRegistration = registration;
        return registration.pushManager.getSubscription();
      })
      .then(subscription => {
        if (subscription === null) {
          return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 
              'BAFYB8Okg4DcyP-DL4_Ovhk9gJY57qIroku12qjbYyytFJ1qm4hoa6EH6pmFCA7AqmaTK_w0xYPV-3A15z0qV-w'
          })
          .then(pushSubscription => {
            return fetch("/subscriptions", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(pushSubscription)
            });
          });
        }
      })
      .catch(error => console.log(error));
    }
};