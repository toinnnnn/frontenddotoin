const CACHE_NAME = 'elden-ring-cache';
const DATA_CACHE_NAME = 'elden-ring-data-cache';

// Arquivos que você quer garantir que sejam cacheados (como a imagem, JS, CSS)
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/js/script.js',
  '/elden.jpeg',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Cache aberto');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições e fazer cache de dados da API
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/game')) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) =>
          fetch(event.request)
            .then((response) => {
              // Cacheia os dados da API
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => cache.match(event.request))
        )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});
