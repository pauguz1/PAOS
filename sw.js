


const CACHE_STATIC_PAGE = 'static-pages-v1.02';



function limpiarCache(){
    return caches.keys().then(k =>{
        k.forEach(key=>{//recorremos las llaves
            /**
             * Comparamos que la key sea diferene a la variable con la version mas actual
             * y si contiene el formato de la variable entonces borramos las versiones anteriores
             * ejmplo variableActual= stV1.0  stV0.9 <-- es diferente a la actual y tiene el formato stV
             */
            if(key !== CACHE_STATIC_PAGE && key.includes('static-pages-v')){
                caches.delete(key);//borramos todas las key que no concuerden con la version actual
            }
        });
    });
}
//evento que se activa cuando se instala el service worker
self.addEventListener('install', e => {


    const lecturaCache = caches.open(CACHE_STATIC_PAGE).then(cache=>{
        return  cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/iconPaos.svg',

            '/img/consulting.png',
            '/img/development.jpeg',
            '/img/img1.png',
            '/img/img2.png',
            '/img/img3.png',
            '/img/instagram.png',
            '/img/mail.png',
            '/img/marketing.png',
            '/img/whats.png',
            '/img/iconSend.png',

            '/img/paul.jpg',
            '/img/osmar.jpg'
        ]);//agregamos las paginas estaticas a agregar
    });
    console.log('instalando');
    e.waitUntil(lecturaCache);

});


//evento que se activa cuano se activa el service worker
self.addEventListener('activate', e => {
    var response = limpiarCache();
    e.waitUntil(response);
});

// SYNC: Recuperamos la conexión a internet
self.addEventListener('sync', event => {

    console.log('Tenemos conexión!');
    console.log(event);
    console.log(event.tag);

});

// esta estrategia de cache primero pide a la red  si no hay internet entonces regresa el cache
self.addEventListener('fetch', e => {

    //cache Only
    e.respondWith( caches.match(e.request) );
});






