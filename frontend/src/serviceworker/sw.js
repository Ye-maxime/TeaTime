//参考 https://github.com/oliviertassinari/serviceworker-webpack-plugin/blob/master/docs/src/sw.js
// https://developers.google.com/web/fundamentals/primers/service-workers
// https://github.com/oliviertassinari/serviceworker-webpack-plugin
// service worker目的: 无网络情况下 从缓存读取文件 显示页面 

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();

let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map(path => {
    return new URL(path, global.location).toString()
})

// When the service worker is first added to a computer.
self.addEventListener('install', event => {
    // Perform install steps.
    console.log(`[SW] install`);

    // Add core website files to cache during serviceworker installation.  
    // global => Node.js 全局对象
    event.waitUntil(
        global.caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(assetsToCache);
            })
            .then(() => {
                console.log('[SW] Cached assets: main', assetsToCache);
            })
            .catch(error => {
                console.error(error);
                throw error;
            })
    )
})

// After the install event.
self.addEventListener('activate', event => {
    console.log(`[SW] activate`);

    // Clean the caches
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                // Delete the caches that are not the current one.
                cacheNames.map(function (cacheName) {
                    if (cacheName.indexOf(CACHE_NAME) === -1) {
                        return global.caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener('message', event => {
    console.log(`[SW] message`);
    switch (event.data.action) {
        case 'skipWaiting':
            if (self.skipWaiting) {
                self.skipWaiting();
                self.clients.claim();
            }
            break;
        default:
            break;
    }
})

self.addEventListener('fetch', event => {
    //在安装 Service Worker 且用户转至其他页面或刷新当前页面后，Service Worker 将开始接收 fetch 事件
    console.log(`[SW] fetch`);
    const request = event.request;

    // Ignore not GET request.
    if (request.method !== 'GET') {
        console.log(`[SW] Ignore non GET request ${request.method}`);
        return;
    }

    const requestUrl = new URL(request.url);

    // Ignore difference origin.
    if (requestUrl.origin !== location.origin) {
        console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
        return;
    }

    const resource = global.caches.match(request).then(response => {
        // 如果发现匹配的响应，则返回缓存的值，否则，将调用 fetch 以发出网络请求

        if (response) {
            // 匹配到已有的cache 是在chrome => application => cache storage 找到所有被缓存的文件!!!
            console.log(`[SW] fetch URL ${requestUrl.href} from cache`);
            return response;
        }

        // Load and cache known assets.
        const fetchRequest = request.clone();
        return fetch(fetchRequest)
            .then(responseNetwork => {
                // Check if we received a valid response
                if (!responseNetwork || !responseNetwork.ok) {
                    console.log(`[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${responseNetwork.status} ${responseNetwork.type}`);

                    return responseNetwork;
                }

                console.log(`[SW] URL ${requestUrl.href} fetched`);
                const responseCache = responseNetwork.clone();

                global.caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(request, responseCache);
                    })
                    .then(() => {
                        console.log(`[SW] Cache asset: ${requestUrl.href}`);
                    })

                return responseNetwork;
            })
            .catch(() => {
                // User is landing on our page.
                if (event.request.mode === 'navigate') {
                    return global.caches.match('./');
                }

                return null;
            })
    })

    event.respondWith(resource);
})