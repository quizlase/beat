// PATCH för att ta bort Install app-knappen från script.js
// Gör dessa ändringar i din befintliga script.js:

// 1. TA BORT anropet till showInstallButton i beforeinstallprompt event (rad ~4081)
// Ändra från:
/*
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  this.deferredPrompt = e;
  this.showInstallButton();
});
*/

// Till:
/*
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  this.deferredPrompt = e;
  // Install button removed - no longer showing
});
*/

// 2. TA BORT hela showInstallButton-funktionen (rader ~4154-4256)
// Ta bort denna funktion helt:
/*
showInstallButton() {
  // Don't show button if already installed
  if (this.isInstalled) return;
  
  // Check if user has hidden the button
  const isHidden = localStorage.getItem('pwa-install-hidden') === 'true';
  if (isHidden) {
    console.log('Install button hidden by user');
    return;
  }
  
  // ... resten av funktionen ...
}
*/

// 3. UPPDATERA hideInstallButton-funktionen (rad ~4258)
// Ändra från:
/*
hideInstallButton() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.remove();
  }
}
*/

// Till:
/*
hideInstallButton() {
  // Install button removed - no longer needed
  console.log('Install button functionality removed');
}
*/

// 4. TA BORT test-funktionerna för install-knappen (rader ~771-787)
// Ta bort dessa funktioner helt:
/*
window.testInstallButton = function() {
  console.log('Testing install button...');
  const installer = new PWAInstaller();
  installer.isInstalled = false; // Force show button
  installer.showInstallButton();
};

window.resetInstallButton = function() {
  console.log('Resetting install button visibility...');
  localStorage.removeItem('pwa-install-hidden');
  console.log('Install button will show again on next page load');
  // Visa knappen direkt också
  const installer = new PWAInstaller();
  installer.isInstalled = false;
  installer.showInstallButton();
};
*/

// 5. LÄGG TILL funktion för att rensa befintliga install-knappar
// Lägg till denna funktion före PWAInstaller-klassen:
/*
function removeExistingInstallButtons() {
  const existingBtn = document.getElementById('pwa-install-btn');
  if (existingBtn) {
    existingBtn.remove();
    console.log('Removed existing install button');
  }
}
*/

// 6. UPPDATERA DOMContentLoaded event (rad ~4398)
// Ändra från:
/*
document.addEventListener('DOMContentLoaded', () => {
  new PWAInstaller();
});
*/

// Till:
/*
document.addEventListener('DOMContentLoaded', () => {
  // Remove any existing install buttons first
  removeExistingInstallButtons();
  new PWAInstaller();
});
*/

// 7. UPPDATERA registerServiceWorker-funktionen (rad ~4108)
// Ändra från:
/*
const registration = await navigator.serviceWorker.register('/beat/sw.js');
*/

// Till:
/*
const registration = await navigator.serviceWorker.register('./sw.js');
*/

// 8. UPPDATERA uppdateringsintervall (rad ~4117)
// Ändra från:
/*
}, 30000); // Check every 30 seconds
*/

// Till:
/*
}, 15000); // Check every 15 seconds
*/
