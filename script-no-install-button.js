// Ändringar för att ta bort Install app-knappen
// Kopiera dessa ändringar till din script.js

// 1. Ta bort anropet till showInstallButton i beforeinstallprompt event
// Ändra från:
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  this.deferredPrompt = e;
  this.showInstallButton(); // TA BORT DENNA RAD
});

// Till:
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  this.deferredPrompt = e;
  // Install button removed - no longer showing
});

// 2. Ta bort hela showInstallButton-funktionen (rader 4154-4256)
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

// 3. Ta bort test-funktionerna för install-knappen
// Ta bort dessa funktioner:
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

// 4. Behåll hideInstallButton-funktionen men gör den tom
hideInstallButton() {
  // Install button removed - no longer needed
  console.log('Install button functionality removed');
}

// 5. Lägg till en funktion för att rensa befintliga install-knappar
function removeExistingInstallButtons() {
  const existingBtn = document.getElementById('pwa-install-btn');
  if (existingBtn) {
    existingBtn.remove();
    console.log('Removed existing install button');
  }
}

// 6. Anropa funktionen vid sidladdning
document.addEventListener('DOMContentLoaded', () => {
  removeExistingInstallButtons();
  new PWAInstaller();
});
