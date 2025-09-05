// Service Worker med Git Hash Versionhantering - GitHub Pages Compatible
class ServiceWorkerManager {
  constructor() {
    this.version = this.getGitHashVersion();
    this.CACHE_NAME = `beat-the-deck-${this.version}`;
    this.init();
  }

  getGitHashVersion() {
    // Försök få Git hash från fetch på index.html
    return this.fetchGitHashFromHTML()
      .then(hash => hash || `dev-${Date.now()}`)
      .catch(() => `dev-${Date.now()}`);
  }

  async fetchGitHashFromHTML() {
    try {
      // FIXED: Use relative path for GitHub Pages compatibility
      const response = await fetch('./index.html');
      const text = await response.text();
      const match = text.match(/<meta name="git-hash" content="([^"]+)"/);
      return match ? match[1] : null;
    } catch (error) {
      console.log('Could not fetch git hash from HTML:', error);
      return null;
    }
  }

  async init() {
    // Wait for version to be determined
    this.version = await this.getGitHashVersion();
    this.CACHE_NAME = `beat-the-deck-${this.version}`;
    
    this.installEvent();
    this.activateEvent();
    this.fetchEvent();
    this.messageEvent();
  }

  installEvent() {
    self.addEventListener('install', event => {
      console.log(`Service Worker installing Git Hash: ${this.version}`);
      event.waitUntil(
        caches.open(this.CACHE_NAME)
          .then(cache => {
            console.log('Caching app shell for version:', this.version);
            return cache.addAll(this.getUrlsToCache());
          })
          .catch(error => {
            console.log('Cache failed:', error);
          })
      );
      self.skipWaiting();
    });
  }

  activateEvent() {
    self.addEventListener('activate', event => {
      console.log(`Service Worker activating Git Hash: ${this.version}`);
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName.startsWith('beat-the-deck-') && cacheName !== this.CACHE_NAME) {
                console.log('Deleting old cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
      self.clients.claim();
    });
  }

  fetchEvent() {
    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            // Return cached version or fetch from network
            return response || fetch(event.request);
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            // FIXED: Use relative paths for GitHub Pages
            if (event.request.destination === 'document') {
              return caches.match('./offline.html') || caches.match('./index.html');
            }
          })
      );
    });
  }

  messageEvent() {
    self.addEventListener('message', event => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });
  }

  getUrlsToCache() {
    return [
      './',
      './index.html',
      './script.js',
      './style.css',
      './pwa-fixes.css',
      './offline.html',
      './assets/splash.svg',
      './assets/css/features/high-contrast.css',
      './assets/css/features/two-player.css',
      './assets/css/features/battle-royale.css',
      './favicon/android-chrome-192x192.png',
      './favicon/android-chrome-512x512.png',
      './favicon/apple-touch-icon.png',
      './favicon/favicon-32x32.png',
      './favicon/favicon-16x16.png',
      './favicon/favicon.ico',
      './favicon/site.webmanifest',
      'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js'
    ];
  }
}

// Initialize Service Worker
const swManager = new ServiceWorkerManager();