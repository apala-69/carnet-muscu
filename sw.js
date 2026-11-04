/* Service worker de Carnet Muscu : l'appli fonctionne hors ligne à la salle.
   Quand tu modifies index.html ou ajoutes des photos, change VERSION et complète la liste. */
const VERSION = 'carnet-muscu-v3';
const FONTS = 'carnet-muscu-polices';
const APP = [
  './',
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'img/abcrunch-0.jpg',
  'img/abcrunch-1.jpg',
  'img/butterfly-0.jpg',
  'img/butterfly-1.jpg',
  'img/cablelat-0.jpg',
  'img/cablelat-1.jpg',
  'img/cablepreacher-0.jpg',
  'img/cablepreacher-1.jpg',
  'img/calfseated-0.jpg',
  'img/calfseated-1.jpg',
  'img/calfstand-0.jpg',
  'img/calfstand-1.jpg',
  'img/chestpress-0.jpg',
  'img/chestpress-1.jpg',
  'img/closepull-0.jpg',
  'img/closepull-1.jpg',
  'img/crossover-0.jpg',
  'img/crossover-1.jpg',
  'img/dbcurl-0.jpg',
  'img/dbcurl-1.jpg',
  'img/dbpress-0.jpg',
  'img/dbpress-1.jpg',
  'img/hacksquat-0.jpg',
  'img/hacksquat-1.jpg',
  'img/hammer-0.jpg',
  'img/hammer-1.jpg',
  'img/hammerrope-0.jpg',
  'img/hammerrope-1.jpg',
  'img/hanging-0.jpg',
  'img/hanging-1.jpg',
  'img/highrow-0.jpg',
  'img/highrow-1.jpg',
  'img/inclinedb-0.jpg',
  'img/inclinedb-1.jpg',
  'img/inclinepress-0.jpg',
  'img/inclinepress-1.jpg',
  'img/isorow-0.jpg',
  'img/isorow-1.jpg',
  'img/kneeraise-0.jpg',
  'img/kneeraise-1.jpg',
  'img/latpull-0.jpg',
  'img/latpull-1.jpg',
  'img/latraise-0.jpg',
  'img/latraise-1.jpg',
  'img/legcurl-0.jpg',
  'img/legcurl-1.jpg',
  'img/legext-0.jpg',
  'img/legext-1.jpg',
  'img/legpress-0.jpg',
  'img/legpress-1.jpg',
  'img/lyinglegcurl-0.jpg',
  'img/lyinglegcurl-1.jpg',
  'img/machinecurl-0.jpg',
  'img/machinecurl-1.jpg',
  'img/milpress-0.jpg',
  'img/milpress-1.jpg',
  'img/overheadrope-0.jpg',
  'img/overheadrope-1.jpg',
  'img/preacher-0.jpg',
  'img/preacher-1.jpg',
  'img/pushdown-0.jpg',
  'img/pushdown-1.jpg',
  'img/rdl-0.jpg',
  'img/rdl-1.jpg',
  'img/revfly-0.jpg',
  'img/revfly-1.jpg',
  'img/seatedrow-0.jpg',
  'img/seatedrow-1.jpg',
  'img/shoulderpress-0.jpg',
  'img/shoulderpress-1.jpg',
  'img/tricepsrope-0.jpg',
  'img/tricepsrope-1.jpg',
];

const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@400;500;600&display=swap';

// Met les polices en cache dès l'installation (sans bloquer si le réseau est absent).
async function cacheFonts() {
  try {
    const c = await caches.open(FONTS);
    const r = await fetch(FONT_CSS);
    if (!r.ok) return;
    await c.put(FONT_CSS, r.clone());
    const urls = [...(await r.text()).matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
    await Promise.all(urls.map(u => fetch(u, { mode: 'cors' }).then(f => f.ok && c.put(u, f)).catch(() => {})));
  } catch (err) {}
}

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([caches.open(VERSION).then(c => c.addAll(APP)), cacheFonts()]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Polices Google : servies depuis le cache, mises à jour en arrière-plan.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // Page : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
  // Si le réseau de la salle est trop lent (plus de 3 s), on ouvre la version en cache.
  if (req.mode === 'navigate') {
    const net = fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); } return r; });
    const slow = new Promise(res => setTimeout(() => caches.match('index.html').then(hit => hit && res(hit)), 3000));
    e.respondWith(Promise.race([net.catch(() => caches.match('index.html')), slow]));
    return;
  }

  // Photos, icônes, manifest : cache d'abord.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
