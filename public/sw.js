/** @type { ServiceWorkerGlobalScope } */
const context = self;

context.addEventListener('install', (event) => {
  console.log('WORKER: install event in progress.');
});

context.addEventListener('activate', (event) => {
  console.log('WORKER: activate event in progress.');
});
