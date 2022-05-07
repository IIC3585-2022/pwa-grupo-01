
// function getToken() {
//   messaging.getToken({ vapidKey: 'BDdgMFOqXHCJ1e6K9fr8RIkTNgX1R6-Dm_cVQFZnDKhzncTpDXlCjrQ8EHKx7pXH4qGweHYg7VK3Yff5itnpdog' }).then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log(currentToken);

//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // Show button to request permission
//       document.getElementsByTagName("body")[0].innerHTML += `
//       <button onclick="requestPermission()" id="permission-button">Click para dar permiso<button>
//       `
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   })
// }
// function requestPermission() {
//   const button = document.getElementById("permission-button");
//   document.getElementsByTagName("body")[0].removeChild(button);
//   messaging.requestPermission().then(() =>
//   // Get registration token. Initially this makes a network call, once retrieved
//   // subsequent calls to getToken will return from cache.
//     getToken()
//   );
// }

// getToken();

