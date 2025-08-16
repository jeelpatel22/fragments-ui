// Service Worker Registration Module
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        // Use dynamic import for service worker to be Parcel-compatible
        const registration = await navigator.serviceWorker.register(
          new URL('./sw.js', import.meta.url),
          { scope: './' }
        );
        
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New version available');
              // You can show a notification to the user here
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
    
    // Handle offline/online status
    window.addEventListener('online', () => {
      console.log('App is online');
      document.body.classList.remove('offline');
      // Trigger sync when back online
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SYNC' });
      }
    });
    
    window.addEventListener('offline', () => {
      console.log('App is offline');
      document.body.classList.add('offline');
    });
  }
}

// PWA Install prompt
export function setupInstallPrompt() {
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installButton = document.getElementById('install-app');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.onclick = () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
              installButton.style.display = 'none';
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
          });
        }
      };
    }
  });
}
