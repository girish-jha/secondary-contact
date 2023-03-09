/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim, RouteMatchCallbackOptions } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();


precacheAndRoute(self.__WB_MANIFEST);
// const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
// registerRoute(
//   ({ request, url }: RouteMatchCallbackOptions) => {
//     if (request.mode !== 'navigate') {
//       return false;
//     }

//     if (url.pathname.startsWith('/_')) {
//       return false;
//     }

//     if (url.pathname.match(fileExtensionRegexp)) {
//       return false;
//     }
//     return true;
//   },
//   createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
// );

// registerRoute(
//   ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
//   new StaleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new ExpirationPlugin({ maxEntries: 50 }),
//     ],
//   })
// );

// self.addEventListener('')

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });
// Any other custom service worker logic can go here.



// const routeMatchArr: RequestDestination[] = ['font', 'document', 'style', 'script', 'manifest', ''];
// const networkFirstRoutes = ({ request }: RouteMatchCallbackOptions) => routeMatchArr.includes(request.destination)

// registerRoute(networkFirstRoutes, new NetworkFirst())

