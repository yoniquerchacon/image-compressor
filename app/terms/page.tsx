import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Uso | Compresor de Imágenes',
  description: 'Términos y condiciones de uso del compresor de imágenes online gratuito. Herramienta segura para comprimir JPG, PNG y WebP.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Términos de Uso
        </h1>
        
        <p className="text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString('es-ES')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de términos</h2>
          <p className="text-gray-700">
            Al acceder y usar este sitio web, aceptas estos términos de uso y nuestra política de privacidad. 
            Si no estás de acuerdo, por favor no uses nuestro servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descripción del servicio</h2>
          <p className="text-gray-700">
            Compresor de Imágenes ofrece una herramienta gratuita para comprimir imágenes (JPG, PNG, WebP) 
            directamente en tu navegador. El servicio es gratuito y no requiere registro.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso aceptable</h2>
          <p className="text-gray-700 mb-4">Te comprometes a:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Usar el servicio solo para propósitos legales</li>
            <li>No intentar interferir con el funcionamiento del sitio</li>
            <li>No usar el servicio para procesar contenido ilegal o inapropiado</li>
            <li>No abusar del servicio con automatización excesiva</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Propiedad intelectual</h2>
          <p className="text-gray-700">
            Tú mantienes todos los derechos sobre las imágenes que comprimes. Nosotros no reclamamos ningún 
            derecho sobre tu contenido. El diseño, código y marca de este sitio son propiedad de Compresor de Imágenes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitación de responsabilidad</h2>
          <p className="text-gray-700 mb-4">
            Este servicio se proporciona &quot;tal cual&quot; sin garantías de ningún tipo. No somos responsables por:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Pérdida de datos o archivos</li>
            <li>Calidad de compresión no satisfactoria</li>
            <li>Interrupciones del servicio</li>
            <li>Daños indirectos o consecuentes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modificaciones del servicio</h2>
          <p className="text-gray-700">
            Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento 
            sin previo aviso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Enlaces a terceros</h2>
          <p className="text-gray-700">
            Este sitio puede contener enlaces a sitios web de terceros. No somos responsables del contenido 
            o las prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Publicidad</h2>
          <p className="text-gray-700">
            Este sitio muestra publicidad a través de Google AdSense y otros servicios. Los anunciantes pueden 
            usar cookies para mostrar anuncios relevantes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cambios a estos términos</h2>
          <p className="text-gray-700">
            Podemos actualizar estos términos ocasionalmente. Te notificaremos de cambios significativos 
            publicando los nuevos términos en esta página.
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
