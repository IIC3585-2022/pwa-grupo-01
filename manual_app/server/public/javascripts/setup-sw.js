
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register(
      '/javascripts/sw.js',
      {
        scope: "/"
      }
    );
  }
}
