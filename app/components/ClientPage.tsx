'use client';

import dynamic from 'next/dynamic';

const ImageCompressor = dynamic(
  () => import('./ImageCompressor'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando compresor...</p>
          </div>
        </div>
      </div>
    )
  }
);

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Comprimir Imágenes Gratis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reduce el tamaño de tus imágenes hasta un <strong>90%</strong> sin perder calidad visible. 
            Rápido, seguro y <strong>100% gratis</strong>. Sin límites.
          </p>
        </header>

        <main className="mb-16">
          <ImageCompressor />
        </main>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Privado</h3>
              <p className="text-gray-600 text-sm">
                Todo se procesa en tu navegador. Tus imágenes nunca se suben.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Súper Rápido</h3>
              <p className="text-gray-600 text-sm">
                Compresión instantánea. Procesa múltiples imágenes a la vez.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sin Pérdida Visible</h3>
              <p className="text-gray-600 text-sm">
                Algoritmos avanzados mantienen la calidad visual de tus fotos.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gratis Sin Límites</h3>
              <p className="text-gray-600 text-sm">
                Comprime todas las imágenes que necesites. Sin registro.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Cómo comprimir imágenes?
          </h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
              <div>
                <strong className="block mb-1">Selecciona tus imágenes</strong>
                <span className="text-gray-600">Arrastra y suelta o haz click para elegir una o múltiples imágenes</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
              <div>
                <strong className="block mb-1">Elige el nivel de compresión</strong>
                <span className="text-gray-600">Selecciona entre alta, media o baja compresión según tus necesidades</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
              <div>
                <strong className="block mb-1">Comprime y descarga</strong>
                <span className="text-gray-600">Haz click en &quot;Comprimir todas&quot; y descarga individualmente o todas en ZIP</span>
              </div>
            </li>
          </ol>
        </section>

        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ¿Por qué comprimir imágenes?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Webs más rápidas
              </h3>
              <p className="text-gray-600">
                Imágenes más pequeñas = páginas que cargan más rápido. Mejora el SEO y la experiencia de usuario.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Ahorra espacio
              </h3>
              <p className="text-gray-600">
                Reduce el espacio en tu disco duro, servidor o nube. Almacena más fotos en menos espacio.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Emails más ligeros
              </h3>
              <p className="text-gray-600">
                Envía más fotos por email sin exceder los límites de tamaño de archivo adjunto.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Menos datos móviles
              </h3>
              <p className="text-gray-600">
                Imágenes comprimidas consumen menos datos al compartir por WhatsApp, redes sociales, etc.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                ¿Se pierde calidad al comprimir?
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Se reduce el tamaño del archivo eliminando datos redundantes, pero la calidad visual se mantiene. 
                Con compresión &quot;Media&quot; o &quot;Baja&quot;, la diferencia es casi imperceptible para el ojo humano.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                ¿Mis imágenes están seguras?
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutamente. Todo el proceso ocurre 100% en tu navegador. Tus imágenes nunca se suben a ningún 
                servidor externo, garantizando tu privacidad total.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                ¿Qué formatos soporta?
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Soportamos los formatos más populares: JPG/JPEG, PNG y WebP. Estos cubren el 99% de las imágenes 
                que usas diariamente.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                ¿Cuánto puedo comprimir?
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Típicamente puedes reducir el tamaño entre 50-90% dependiendo del nivel de compresión elegido y 
                la imagen original. Fotos de alta resolución tienden a comprimirse más.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                ¿Hay límite de imágenes?
                <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                No hay límite. Puedes comprimir tantas imágenes como necesites, una por una o por lotes. 
                Completamente gratis, sin registro.
              </p>
            </details>
          </div>
        </section>

        <footer className="mt-20 text-center text-gray-600 border-t pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="/privacy" className="hover:text-blue-600 transition-colors">
              Política de Privacidad
            </a>
            <a href="/terms" className="hover:text-blue-600 transition-colors">
              Términos de Uso
            </a>
          </div>
          <p className="text-sm">
            © 2026 Compresor de Imágenes. Herramienta gratuita para reducir el tamaño de fotos online.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Procesamiento 100% en tu navegador. Tus imágenes nunca se suben a ningún servidor.
          </p>
        </footer>
      </div>
    </div>
  );
}
