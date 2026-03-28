const CACHE_NAME = 'ksk-pos-v42';

// 1. 安裝階段：強制立刻接管，不等待
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

// 2. 啟動階段：無情刪除所有舊版快取垃圾
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 [Service Worker] 刪除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // 立刻奪取網頁控制權
  );
});

// 3. 攔截請求階段：採用「網路優先 (Network First)」策略，不再阻擋 API
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
