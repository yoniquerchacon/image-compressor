# 🌐 Configurar Dominio Personalizado y Google AdSense

## ✅ LOGO ACTUALIZADO

Tu nuevo logo ya está subido. Vercel lo actualizará automáticamente en 2-3 minutos.

**Características del logo:**
- 🎨 Gradiente morado-azul moderno
- 🖼️ Icono de imagen con montañas
- ⬇️ Flecha de compresión
- 📱 Se ve bien en cualquier tamaño

---

## 🌍 PARTE 1: DOMINIO PERSONALIZADO

### Opción A: Dominio .com (Recomendado para negocio)

**Dominios disponibles que puedes comprar:**

1. **comprimirimagen.com** ⭐ MEJOR OPCIÓN
   - Fácil de recordar
   - SEO friendly (palabra clave exacta)
   - Costo: ~$12-15/año

2. **imagecompress.app** 
   - Moderno (.app)
   - Costo: ~$18-20/año

3. **compresorfoto.com**
   - Alternativa en español
   - Costo: ~$12-15/año

---

### 📋 Paso a Paso: Comprar y Configurar Dominio

#### PASO 1: Comprar el dominio

**Opciones de registradores (donde comprar):**

1. **Namecheap** (Recomendado)
   - URL: https://www.namecheap.com
   - Pros: Barato, fácil, buena privacidad
   - Precio: ~$8-13/año
   - ✅ Acepta PayPal y tarjetas

2. **GoDaddy**
   - URL: https://www.godaddy.com
   - Pros: Conocido, soporte 24/7
   - Precio: ~$12-20/año (más caro)

3. **Vercel Domains** (Lo más fácil)
   - Directamente desde Vercel
   - Precio: ~$15-20/año
   - ✅ Se configura automáticamente

---

#### PASO 2A: Si compraste en Namecheap/GoDaddy

1. **En Namecheap/GoDaddy:**
   - Ve a "Domain List" → Tu dominio → "Manage"
   - Click en "Advanced DNS" o "DNS Settings"
   - Elimina todos los registros A y CNAME existentes
   
2. **Agrega estos registros:**

   **Registro A (para el dominio raíz):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```

   **Registro CNAME (para www):**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. **Guarda los cambios**

---

#### PASO 2B: Si compraste en Vercel (Más fácil)

1. En Vercel dashboard:
   - Ve a tu proyecto `image-compressor`
   - Click en "Settings" → "Domains"
   - Click en "Buy Domain"
   - Busca: `comprimirimagen.com`
   - Completa la compra
   - ✅ ¡Se configura automáticamente!

---

#### PASO 3: Conectar dominio a Vercel

1. **En Vercel:**
   - Ve a tu proyecto `image-compressor`
   - Click en **"Settings"** (arriba)
   - Click en **"Domains"** (menú izquierdo)

2. **Agregar dominio:**
   - Click en **"Add"**
   - Escribe: `comprimirimagen.com` (tu dominio)
   - Click en **"Add"**

3. **Agregar www también:**
   - Click en **"Add"** de nuevo
   - Escribe: `www.comprimirimagen.com`
   - Click en **"Add"**
   - Marca "Redirect to comprimirimagen.com"

4. **Espera 10-60 minutos:**
   - Los DNS tardan en propagarse
   - Vercel te mostrará ✅ cuando esté listo

---

### 💰 Costo Total del Dominio:

| Registrador | Primer año | Renovación anual |
|-------------|------------|------------------|
| Namecheap | $8-13 | $10-15 |
| GoDaddy | $12-20 | $15-25 |
| Vercel | $15-20 | $15-20 |

**Recomendación:** Namecheap (más barato)

---

## 💰 PARTE 2: GOOGLE ADSENSE

### ⚠️ IMPORTANTE: Requisitos Mínimos

Google AdSense tiene requisitos estrictos:

**Requisitos técnicos:**
- ✅ Dominio propio (comprado)
- ✅ Sitio online (ya lo tienes)
- ✅ Contenido original (ya lo tienes)
- ✅ Páginas de políticas (necesitas agregar)

**Requisitos de tráfico (NO OFICIALES pero recomendados):**
- 📊 Mínimo: 50-100 visitas/día
- 📊 Ideal: 500+ visitas/día
- ⏱️ Tiempo: 1-3 meses de antigüedad del sitio

**Países con mejor aprobación:**
- ✅ USA, Canadá, España: Fácil
- ⚠️ Latinoamérica: Posible pero más estricto
- ❌ Algunos países: Difícil

---

### 📋 Paso a Paso: Aplicar a Google AdSense

#### PASO 1: Preparar tu sitio (ANTES de aplicar)

1. **Agregar páginas legales:**

Necesitas crear estas páginas (te ayudo después si quieres):

- **Política de Privacidad** (`/privacy`)
- **Términos de Uso** (`/terms`)
- **Política de Cookies** (`/cookies`)
- **Contacto** (`/contact`)

2. **Agregar más contenido:**
   - Blog con 3-5 artículos útiles
   - "Cómo comprimir imágenes para web"
   - "Diferencia entre JPG y PNG"
   - "Optimizar imágenes para redes sociales"

---

#### PASO 2: Aplicar a AdSense

1. **Ve a:** https://www.google.com/adsense

2. **Click en "Comenzar"**

3. **Completa el formulario:**
   ```
   URL del sitio: comprimirimagen.com (tu dominio)
   Email: tu email de Gmail
   País: Tu país
   Acepta términos
   ```

4. **Verificar sitio:**
   - Google te dará un código como:
   ```html
   <script data-ad-client="ca-pub-XXXXXXXXXX" 
           async 
           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
   </script>
   ```

---

#### PASO 3: Agregar código de AdSense a tu sitio

Una vez te den el código, lo agregamos en `app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

#### PASO 4: Esperar aprobación

**Timeline típico:**
- ⏱️ **1-7 días:** Revisión inicial
- ⏱️ **7-14 días:** Revisión completa
- ⏱️ **14-30 días:** Si piden más info

**Estados posibles:**
- ✅ **Aprobado:** ¡Puedes empezar a poner ads!
- ⏸️ **En revisión:** Espera
- ❌ **Rechazado:** Mejora el sitio y reaplica en 30 días

---

#### PASO 5: Colocar Anuncios (cuando aprueban)

**Posiciones recomendadas:**

1. **Antes del compresor** (Top Banner)
   - Formato: Horizontal Banner (728x90 o responsive)
   - Rendimiento: Alto

2. **Después de las características** (Mid-content)
   - Formato: Rectangle (300x250)
   - Rendimiento: Medio-Alto

3. **En el footer** (Bottom)
   - Formato: Horizontal Banner
   - Rendimiento: Medio

**Código para agregar anuncio:**

```typescript
// Crear componente: app/components/AdBanner.tsx

'use client';

import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Ad error:', e);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="YYYYYYYYYY"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

---

### 💵 Ganancias Estimadas con AdSense

**Cálculo realista:**

| Visitas/día | CPM* | Clicks/día | Ingresos/día | Ingresos/mes |
|-------------|------|-----------|--------------|--------------|
| 100 | $2 | 1-2 | $0.20-0.50 | $6-15 |
| 500 | $3 | 5-10 | $1-3 | $30-90 |
| 1,000 | $5 | 10-20 | $3-8 | $90-240 |
| 5,000 | $8 | 50-100 | $20-50 | $600-1,500 |
| 10,000 | $10 | 100-200 | $50-120 | $1,500-3,600 |

*CPM = Costo por cada 1000 impresiones

**Factores que afectan ganancias:**
- 📍 País de tus visitantes (USA/Europa paga más)
- 🎯 Nicho (tech/finanzas paga más que general)
- 📱 Tipo de dispositivo (desktop paga más)
- 🕐 Temporada (diciembre paga más)

---

## 🎯 ORDEN RECOMENDADO

### Corto Plazo (Esta semana):
1. ✅ Logo actualizado (ya hecho)
2. 🔲 Comprar dominio
3. 🔲 Configurar dominio en Vercel
4. 🔲 Verificar que funciona

### Mediano Plazo (Próximas 2-4 semanas):
1. 🔲 Generar tráfico inicial (Reddit, Product Hunt)
2. 🔲 Crear páginas legales
3. 🔲 Agregar blog con 3-5 artículos
4. 🔲 Llegar a 100+ visitas/día

### Largo Plazo (1-3 meses):
1. 🔲 Aplicar a Google AdSense
2. 🔲 Esperar aprobación
3. 🔲 Implementar anuncios
4. 🔲 Optimizar posiciones de ads

---

## 🚀 ALTERNATIVAS A ADSENSE (Mientras esperas)

Si AdSense rechaza o demora mucho:

1. **Media.net**
   - Similar a AdSense
   - Más fácil aprobación
   - Paga un poco menos

2. **PropellerAds**
   - Muy fácil aprobación
   - Acepta sitios nuevos
   - Ads más intrusivos

3. **Carbon Ads**
   - Para sitios tech
   - Ads de alta calidad
   - Paga bien pero selectivo

4. **Modelo Freemium**
   - Sin ads en versión base
   - Premium $1.99/mes sin ads
   - Puedes empezar antes que con AdSense

---

## 💡 CONSEJO FINAL

**No te apresures con AdSense:**

1. Primero enfócate en **conseguir tráfico**
2. Construye **contenido de calidad**
3. Espera **2-3 meses** con 500+ visitas/día
4. **Entonces aplica** a AdSense

Con tráfico sólido, AdSense te aprobará rápido y ganarás más.

---

## 📞 ¿NECESITAS AYUDA?

Te puedo ayudar a:
- ✅ Crear las páginas legales
- ✅ Escribir artículos para el blog
- ✅ Configurar el código de AdSense
- ✅ Optimizar para SEO

**¿Qué quieres hacer primero?**
1. Comprar dominio
2. Crear páginas legales
3. Agregar blog
