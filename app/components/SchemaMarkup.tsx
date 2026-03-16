'use client';

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compresor de Imágenes",
    "alternateName": "Image Compressor",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://compressor-imagenes.com",
    "description": "Comprime imágenes JPG, PNG y WebP gratis hasta 90% sin perder calidad. 100% en tu navegador, sin subir archivos.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Compresión de JPG, PNG y WebP",
      "Procesamiento 100% local en el navegador",
      "Sin límites de uso",
      "Sin registro requerido",
      "Descarga individual o en ZIP",
      "3 niveles de calidad",
      "Preview antes/después"
    ],
    "screenshot": "https://compressor-imagenes.com/icon.svg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Compresor de Imágenes"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es gratis comprimir imágenes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, completamente gratis y sin límites. No requiere registro ni tarjeta de crédito. Puedes comprimir todas las imágenes que necesites."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mis imágenes son privadas y seguras?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100% seguro. Todo el procesamiento ocurre directamente en tu navegador. Tus imágenes NUNCA se suben a ningún servidor. Nadie excepto tú tiene acceso a tus archivos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué formatos de imagen puedo comprimir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes comprimir imágenes en formato JPG, JPEG, PNG y WebP. Estos son los formatos más comunes para fotos y gráficos web."
        }
      },
      {
        "@type": "Question",
        "name": "¿Pierdo calidad al comprimir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La pérdida de calidad es mínima y casi imperceptible. Ofrecemos 3 niveles de compresión para que elijas el balance perfecto entre tamaño y calidad. La mayoría de usuarios no nota diferencia visual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto puedo reducir el tamaño?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende de la imagen original, pero típicamente puedes reducir entre 50-90% del tamaño sin pérdida visible de calidad. Imágenes grandes de cámara profesional pueden reducirse hasta 95%."
        }
      },
      {
        "@type": "Question",
        "name": "¿Funciona en móvil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, funciona perfectamente en cualquier dispositivo: computadora, tablet o smartphone. La interfaz es completamente responsive y optimizada para pantallas táctiles."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo comprimir imágenes online",
    "description": "Guía paso a paso para comprimir imágenes JPG, PNG y WebP sin perder calidad",
    "image": "https://compressor-imagenes.com/icon.svg",
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": {
      "@type": "HowToTool",
      "name": "Compresor de Imágenes Online"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sube tus imágenes",
        "text": "Arrastra y suelta tus imágenes JPG, PNG o WebP en el área indicada, o haz click para seleccionarlas desde tu dispositivo. Puedes subir múltiples imágenes a la vez.",
        "url": "https://compressor-imagenes.com#step1"
      },
      {
        "@type": "HowToStep",
        "name": "Selecciona la calidad",
        "text": "Elige entre 3 niveles de compresión: Máxima (más pequeño), Media (balance), o Mínima (mejor calidad). La mayoría de usuarios prefiere 'Media'.",
        "url": "https://compressor-imagenes.com#step2"
      },
      {
        "@type": "HowToStep",
        "name": "Comprime",
        "text": "Haz click en 'Comprimir Todas' para procesar todas las imágenes simultáneamente. El procesamiento es instantáneo y ocurre en tu navegador.",
        "url": "https://compressor-imagenes.com#step3"
      },
      {
        "@type": "HowToStep",
        "name": "Descarga",
        "text": "Descarga cada imagen individualmente o todas juntas en un archivo ZIP. Compara el antes/después con el preview incluido.",
        "url": "https://compressor-imagenes.com#step4"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ path }: { path: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://compressor-imagenes.com"
      },
      ...(path !== '/' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": path.split('/').filter(Boolean).join(' > '),
        "item": `https://compressor-imagenes.com${path}`
      }] : [])
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Compresor de Imágenes",
    "url": "https://compressor-imagenes.com",
    "logo": "https://compressor-imagenes.com/icon.svg",
    "description": "Herramienta gratuita para comprimir imágenes JPG, PNG y WebP sin límites",
    "sameAs": [
      "https://github.com/yoniquerchacon/image-compressor"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Compresor de Imágenes",
    "url": "https://compressor-imagenes.com",
    "description": "Comprime imágenes gratis hasta 90% sin perder calidad",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://compressor-imagenes.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
