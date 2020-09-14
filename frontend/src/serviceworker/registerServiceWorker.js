/* eslint-disable no-console */
// We register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// 注册service worker
export default function register() {
    // Make sure sw are supported
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('../sw.js') // 调用sw.js文件来执行sw 的生命周期函数
                .then(() => console.log('[SW] Registered (Pages)'))
                .catch((err) => console.log(`[SW] Error: ${err}`));
        });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
