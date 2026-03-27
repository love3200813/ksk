// 保持空邏輯，僅為了符合 Google App 打包的最低規範
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // 不做緩存攔截，直接從網路讀取
});
