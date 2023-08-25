import { Workbox } from "workbox-window";

const register = () => {
    if (process.env.NODE_ENV !== "production") return;
    if (navigator?.serviceWorker) {
        const wb = new Workbox(`${process.env.PUBLIC_URL}/service-worker.js`);

        const checkForUpdate = () => {
            const isUpdate = window.confirm("New Update Available. Click OK to update");
            if (isUpdate) {
                wb.messageSkipWaiting();
            }
        };

        var CACHE_NAME = 'my-pwa-cache-v1';
        var urlsToCache = [
            '/',
        ];
        const installForDef = (event) => {
            event.waitUntil(
                caches.open(CACHE_NAME)
                    .then(function (cache) {
                        // Open a cache and cache our files
                        return cache.addAll(urlsToCache);
                    })
            );
        }

        wb.addEventListener("waiting", checkForUpdate);
        wb.addEventListener("install", installForDef);

        wb.register();
    }
};

