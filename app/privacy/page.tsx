import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Compresor de Imágenes',
  description: 'Política de privacidad del compresor de imágenes. Tus imágenes se procesan 100% en tu navegador, nunca se suben a servidores.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Política de Privacidad
        </h1>
        
        <p className="text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que recopilamos</h2>
          <p className="text-gray-700 mb-4">
            Compresor de Imágenes no recopila, almacena ni procesa ninguna de tus imágenes en nuestros servidores. 
            Toda la compresión se realiza 100% en tu navegador.
          </p>
          <p className="text-gray-700">
            Podemos recopilar información anónima de uso a través de Google Analytics, incluyendo:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Páginas visitadas</li>
            <li>Tiempo en el sitio</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>País de origen (aproximado)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo usamos tu información</h2>
          <p className="text-gray-700 mb-4">
            La información anónima recopilada se utiliza únicamente para:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Mejorar la experiencia del usuario</li>
            <li>Entender el uso de la herramienta</li>
            <li>Optimizar el rendimiento del sitio</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies</h2>
          <p className="text-gray-700 mb-4">
            Este sitio utiliza cookies para:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Google Analytics (análisis de tráfico)</li>
            <li>Google AdSense (publicidad, si aplica)</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Puedes deshabilitar las cookies en la configuración de tu navegador.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Privacidad de tus imágenes</h2>
          <p className="text-gray-700 font-semibold mb-2">
            Tus imágenes NUNCA se suben a ningún servidor.
          </p>
          <p className="text-gray-700">
            El proceso de compresión ocurre completamente en tu navegador usando JavaScript. 
            Tus archivos permanecen en tu dispositivo en todo momento. No tenemos acceso a ellos ni los almacenamos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Servicios de terceros</h2>
          <p className="text-gray-700 mb-4">
            Este sitio utiliza los siguientes servicios de terceros:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Vercel:</strong> Hosting del sitio web</li>
            <li><strong>Google Analytics:</strong> Análisis de tráfico</li>
            <li><strong>Google AdSense:</strong> Publicidad (si aplica)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Tus derechos</h2>
          <p className="text-gray-700">
            Tienes derecho a solicitar información sobre los datos que podemos tener sobre ti, 
            aunque en nuestro caso no almacenamos información personal identificable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cambios a esta política</h2>
          <p className="text-gray-700">
            Podemos actualizar esta política de privacidad ocasionalmente. Los cambios se publicarán en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
          <p className="text-gray-700">
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en la página de inicio.
          </p>
        </section>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
