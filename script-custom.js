// Copy the entire content of script.js but replace the Service Worker registration
// This is a placeholder - you need to copy your entire script.js content here
// and change line 3785 from:
// const registration = await navigator.serviceWorker.register('/sw.js');
// to:
// const registration = await navigator.serviceWorker.register('./sw.js');

// For now, here's just the PWA part with correct paths:

// PWA Installation and Update Handling med Git Hash Version
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
        // UPDATED: Use relative path for custom domain
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('Service Worker registered for Git Hash:', this.currentGitHash);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
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

  showInstallButton() {
    // Don't show button if already installed
    if (this.isInstalled) return;
    
    // Create install button
    const installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.innerHTML = '📱 Install App';
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #16213e;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      font-family: Arial, sans-serif;
    `;
    
    installBtn.addEventListener('click', () => this.installApp());
    installBtn.addEventListener('mouseenter', () => {
      installBtn.style.transform = 'scale(1.05)';
      installBtn.style.background = '#1a1a2e';
    });
    installBtn.addEventListener('mouseleave', () => {
      installBtn.style.transform = 'scale(1)';
      installBtn.style.background = '#16213e';
    });

    document.body.appendChild(installBtn);
  }

  hideInstallButton() {
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.remove();
    }
  }

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      this.deferredPrompt = null;
      
      if (outcome === 'accepted') {
        this.hideInstallButton();
      }
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
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        max-width: 300px;
        font-family: Arial, sans-serif;
      ">
        <div style="font-weight: bold; margin-bottom: 10px;">🔄 Update Available!</div>
        <div style="font-size: 12px; margin-bottom: 5px; opacity: 0.8;">Current: ${this.currentGitHash}</div>
        <div style="font-size: 14px; margin-bottom: 15px;">A new version is ready to install.</div>
        <button id="update-btn" style="
          background: #4CAF50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
          font-family: Arial, sans-serif;
        ">Update Now</button>
        <button id="dismiss-update" style="
          background: #666;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-family: Arial, sans-serif;
        ">Later</button>
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
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PWAInstaller();
});
