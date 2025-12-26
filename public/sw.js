// SPYLT™ Service Worker for Performance Optimization
const CACHE_NAME = 'spylt-v1.0.0';
const STATIC_CACHE = 'spylt-static-v1.0.0';
const DYNAMIC_CACHE = 'spylt-dynamic-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/nav-logo.svg',
  '/images/hero-img.png',
  '/images/Final.png',
  '/fonts/ProximaNova-Regular.otf',
  '/manifest.json'
];

// Resources to cache on first request
const DYNAMIC_ASSETS = [
  '/images/',
  '/videos/',
  '/fonts/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('SPYLT Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SPYLT Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('SPYLT Service Worker: Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SPYLT Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SPYLT Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('SPYLT Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SPYLT Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isDynamicAsset(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('SPYLT Service Worker: Cache first strategy failed', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('SPYLT Service Worker: Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network error and no cached version available', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.includes('/images/nav-logo.svg') ||
         url.includes('/images/hero-img.png') ||
         url.includes('/fonts/') ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.endsWith('/');
}

function isAPIRequest(url) {
  return url.includes('/api/') || 
         url.includes('analytics') ||
         url.includes('tracking');
}

function isDynamicAsset(url) {
  return url.includes('/images/') ||
         url.includes('/videos/') ||
         url.includes('.webp') ||
         url.includes('.mp4');
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    // Sync any pending analytics data when connection is restored
    const pendingData = await getStoredAnalytics();
    if (pendingData.length > 0) {
      await sendAnalytics(pendingData);
      await clearStoredAnalytics();
    }
  } catch (error) {
    console.error('SPYLT Service Worker: Analytics sync failed', error);
  }
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/nav-logo.svg',
      badge: '/images/nav-logo.svg',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/'
      },
      actions: [
        {
          action: 'open',
          title: 'View SPYLT™',
          icon: '/images/nav-logo.svg'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'SPYLT™', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    const url = event.notification.data.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('SPYLT Service Worker: Error occurred', event.error);
});

// Unhandled promise rejection
self.addEventListener('unhandledrejection', (event) => {
  console.error('SPYLT Service Worker: Unhandled promise rejection', event.reason);
});

// Helper functions for analytics storage
async function getStoredAnalytics() {
  // Implementation would depend on IndexedDB or other storage
  return [];
}

async function sendAnalytics(data) {
  // Implementation for sending analytics data
  return Promise.resolve();
}

async function clearStoredAnalytics() {
  // Implementation for clearing stored analytics
  return Promise.resolve();
}

console.log('SPYLT Service Worker: Loaded successfully');