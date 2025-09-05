// Komplett script.js utan Install app-knappen
// Ersätt din befintliga script.js med denna version

// ... all existing code before PWAInstaller class ...

// PWA Installation and Update Handling med Git Hash Version - WITHOUT Install Button
class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.currentGitHash = this.getCurrentGitHash();
    this.init();
  }

  getCurrentGitHash() {
    const metaHash = document.querySelector('meta[name="git-hash"]');
    return metaHash ? metaHash.getAttribute('content') : 'unknown';
  }

  init() {
    // Check if app is already installed
    this.checkInstallStatus();
    
    // Listen for beforeinstallprompt - BUT DON'T SHOW BUTTON
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      // Install button removed - no longer showing
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
        // Use correct path for custom domain
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('Service Worker registered for Git Hash:', this.currentGitHash);

        // Check for updates immediately
        await this.checkForUpdates(registration);

        // Check for updates periodically
        setInterval(() => {
          this.checkForUpdates(registration);
        }, 15000); // Check every 15 seconds

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

  // REMOVED: showInstallButton() function completely removed

  hideInstallButton() {
    // Install button removed - no longer needed
    console.log('Install button functionality removed');
  }

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      this.deferredPrompt = null;
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

    // Add hover effects
    const updateBtn = document.getElementById('update-btn');
    const dismissBtn = document.getElementById('dismiss-update');
    
    updateBtn.addEventListener('mouseenter', () => {
      updateBtn.style.background = '#FFA500';
      updateBtn.style.borderColor = '#FFA500';
      updateBtn.style.transform = 'scale(1.05)';
    });
    
    updateBtn.addEventListener('mouseleave', () => {
      updateBtn.style.background = '#FFD700';
      updateBtn.style.borderColor = '#FFD700';
      updateBtn.style.transform = 'scale(1)';
    });
    
    dismissBtn.addEventListener('mouseenter', () => {
      dismissBtn.style.background = '#FFD700';
      dismissBtn.style.color = '#16213e';
      dismissBtn.style.transform = 'scale(1.05)';
    });
    
    dismissBtn.addEventListener('mouseleave', () => {
      dismissBtn.style.background = '#1a1a2e';
      dismissBtn.style.color = '#FFD700';
      dismissBtn.style.transform = 'scale(1)';
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
}

// Function to remove any existing install buttons
function removeExistingInstallButtons() {
  const existingBtn = document.getElementById('pwa-install-btn');
  if (existingBtn) {
    existingBtn.remove();
    console.log('Removed existing install button');
  }
}

// REMOVED: Test functions for install button
// window.testInstallButton = function() { ... }
// window.resetInstallButton = function() { ... }

// Test funktion för uppdateringar
window.testUpdate = function() {
  console.log('Testing update notification...');
  const installer = new PWAInstaller();
  installer.showUpdateNotification();
};

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Remove any existing install buttons first
  removeExistingInstallButtons();
  new PWAInstaller();
});
