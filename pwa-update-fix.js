// PWA Update Fix för GitHub Pages
// Lägg till dessa funktioner i din script.js

// Förbättrad PWAInstaller-klass med GitHub Pages kompatibilitet
class PWAInstallerFixed {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.currentGitHash = this.getCurrentGitHash();
    this.updateCheckInterval = null;
    this.registration = null;
    this.init();
  }

  getCurrentGitHash() {
    const metaHash = document.querySelector('meta[name="git-hash"]');
    return metaHash ? metaHash.getAttribute('content') : 'unknown';
  }

  init() {
    // Check if app is already installed
    this.checkInstallStatus();
    
    // Listen for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.hideInstallButton();
    });

    // Register service worker
    this.registerServiceWorker();
  }

  checkInstallStatus() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
      console.log('Running as PWA with Git Hash:', this.currentGitHash);
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        // FIXED: Use relative path for GitHub Pages compatibility
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('Service Worker registered for Git Hash:', this.currentGitHash);

        // Store registration for debugging
        this.registration = registration;

        // Check for updates immediately
        await this.checkForUpdates(registration);

        // Check for updates more frequently (every 15 seconds)
        this.updateCheckInterval = setInterval(() => {
          this.checkForUpdates(registration);
        }, 15000); // Check every 15 seconds instead of 30

        // Listen for updatefound event
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found!');
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            console.log('New worker state:', newWorker.state);
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New version installed, showing notification');
              this.showUpdateNotification();
            }
          });
        });

        // Listen for controlling service worker changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service Worker updated, reloading page...');
          window.location.reload();
        });

      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  async checkForUpdates(registration) {
    try {
      console.log('Checking for updates...');
      await registration.update();
      console.log('Update check completed');
    } catch (error) {
      console.log('Update check failed:', error);
    }
  }

  showUpdateNotification() {
    // Remove existing notification if any
    const existing = document.getElementById('pwa-update-notification');
    if (existing) existing.remove();
    
    // Create update notification with Git Hash info
    const updateDiv = document.createElement('div');
    updateDiv.id = 'pwa-update-notification';
    updateDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #16213e;
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        z-index: 1001;
        text-align: center;
        max-width: 500px;
        width: 90%;
        font-family: Arial, sans-serif;
        border: 2px solid #FFD700;
      ">
        <div style="font-weight: bold; margin-bottom: 10px; color: #FFD700; font-size: 18px;">🔄 Update Available!</div>
        <div style="font-size: 12px; margin-bottom: 5px; opacity: 0.8;">Current: ${this.currentGitHash}</div>
        <div style="font-size: 16px; margin-bottom: 20px;">A new version is ready to install.</div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
          <button id="dismiss-update" style="
            background: #1a1a2e;
            color: #FFD700;
            border: 2px solid #FFD700;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: all 0.3s ease;
            flex: 1;
          ">Later</button>
          <button id="update-btn" style="
            background: #FFD700;
            color: #16213e;
            border: 2px solid #FFD700;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: all 0.3s ease;
            flex: 1;
          ">Update Now</button>
        </div>
      </div>
    `;

    document.body.appendChild(updateDiv);

    // Add event listeners
    document.getElementById('update-btn').addEventListener('click', () => {
      this.updateApp();
    });

    document.getElementById('dismiss-update').addEventListener('click', () => {
      updateDiv.remove();
    });

    // Auto-dismiss after 15 seconds
    setTimeout(() => {
      if (document.getElementById('pwa-update-notification')) {
        updateDiv.remove();
      }
    }, 15000);
  }

  updateApp() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
    // Remove notification
    const updateDiv = document.getElementById('pwa-update-notification');
    if (updateDiv) updateDiv.remove();
  }

  // Debug functions
  debugPWA() {
    console.log('=== PWA DEBUG INFO ===');
    console.log('Service Worker supported:', 'serviceWorker' in navigator);
    console.log('Current Git Hash:', this.currentGitHash);
    console.log('PWA mode:', window.matchMedia('(display-mode: standalone)').matches);
    console.log('Update check interval:', this.updateCheckInterval ? 'Active' : 'Inactive');
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('Service Worker registration:', registration);
        if (registration) {
          console.log('Service Worker state:', registration.active?.state);
          console.log('Service Worker scope:', registration.scope);
          console.log('Waiting worker:', registration.waiting ? 'Yes' : 'No');
        }
      });
    }
  }

  forceUpdateCheck() {
    if (this.registration) {
      console.log('Forcing update check...');
      this.checkForUpdates(this.registration);
    } else {
      console.log('No registration available');
    }
  }
}

// Lägg till dessa debug-funktioner i din script.js
window.debugPWA = function() {
  console.log('=== PWA DEBUG INFO ===');
  console.log('Service Worker supported:', 'serviceWorker' in navigator);
  console.log('Current Git Hash:', document.querySelector('meta[name="git-hash"]')?.getAttribute('content'));
  console.log('PWA mode:', window.matchMedia('(display-mode: standalone)').matches);
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      console.log('Service Worker registration:', registration);
      if (registration) {
        console.log('Service Worker state:', registration.active?.state);
        console.log('Service Worker scope:', registration.scope);
        console.log('Waiting worker:', registration.waiting ? 'Yes' : 'No');
      }
    });
  }
};

window.forceUpdateCheck = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        console.log('Forcing update check...');
        registration.update().then(() => {
          console.log('Update check completed');
        });
      }
    });
  }
};

window.testUpdate = function() {
  console.log('Testing update notification...');
  const installer = new PWAInstallerFixed();
  installer.showUpdateNotification();
};

// Använd denna istället för den gamla PWAInstaller-klassen
// Ersätt: new PWAInstaller();
// Med: new PWAInstallerFixed();
