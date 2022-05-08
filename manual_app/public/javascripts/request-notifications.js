
async function requestNotificationPermission() {
  return await Notification.requestPermission().then(function(status) {
    if(status === "granted") {
      displayNotification();
    }
    document.getElementById("notification-prompt").style.display = "none";
  });
}
function disableNotificationPermission() {
  localStorage.setItem("notification-permission", false)
  document.getElementById("notification-prompt").style.display = "none";
}

async function displayNotification() {
  if (Notification.permission == 'granted') {
    await navigator.serviceWorker.ready.then(function(reg) {
      reg.showNotification('Ahora estarás suscrito a las últimas noticias!');
      return reg;
    });
  }
}