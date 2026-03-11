# 🛡️ GUÍA DE SEGURIDAD - Compresor de Imágenes

Esta guía explica todas las medidas de seguridad implementadas en tu aplicación y cómo protegerla de ataques comunes.

---

## 📋 **ÍNDICE**

1. [Medidas Implementadas](#medidas-implementadas)
2. [Protección Contra Ataques Comunes](#protección-contra-ataques-comunes)
3. [Configuración de Vercel](#configuración-de-vercel)
4. [Monitoreo y Alertas](#monitoreo-y-alertas)
5. [Mejores Prácticas](#mejores-prácticas)

---

## ✅ **MEDIDAS IMPLEMENTADAS**

### **1. Headers de Seguridad HTTP**

**Archivo:** `next.config.ts`

Headers implementados:

- **`Strict-Transport-Security`**: Fuerza HTTPS siempre
- **`X-Frame-Options`**: Previene clickjacking
- **`X-Content-Type-Options`**: Previene MIME type sniffing
- **`X-XSS-Protection`**: Protección contra XSS
- **`Content-Security-Policy`**: Controla qué recursos se pueden cargar
- **`Referrer-Policy`**: Controla información enviada a otros sitios
- **`Permissions-Policy`**: Bloquea acceso a cámara, micrófono, etc.

**¿Qué protegen?**
- Ataques de clickjacking
- Cross-Site Scripting (XSS)
- MIME type confusion
- Inyección de código malicioso
- Acceso no autorizado a dispositivos

---

### **2. Content Security Policy (CSP)**

**Protecciones específicas:**

```
default-src 'self'                      → Solo carga recursos del mismo dominio
script-src 'self' [dominios aprobados]  → Scripts solo de fuentes confiables
img-src 'self' data: blob: https:       → Imágenes de cualquier HTTPS + data URLs
object-src 'none'                       → Bloquea Flash y plugins
upgrade-insecure-requests               → Actualiza HTTP a HTTPS automáticamente
```

**Dominios Permitidos:**
- `cdnjs.cloudflare.com` → Bibliotecas de compresión
- Google AdSense y Analytics (cuando los implementes)

**¿Qué protege?**
- Inyección de scripts maliciosos
- Carga de contenido no autorizado
- Ataques XSS avanzados

---

### **3. Validación de Archivos (Client-Side)**

**Archivo:** `app/components/ImageCompressor.tsx`

**Límites establecidos:**

| Validación | Valor | Propósito |
|------------|-------|-----------|
| **Tamaño máximo por archivo** | 10 MB | Prevenir abuso de memoria |
| **Número máximo de archivos** | 50 imágenes | Prevenir sobrecarga del navegador |
| **Tipos permitidos** | JPG, PNG, WebP | Solo formatos seguros |
| **Nombres de archivo** | Sin `..`, `/`, `\` | Prevenir path traversal |

**Validaciones:**
- Tipo MIME correcto
- Tamaño no excede límite
- Archivo no está vacío
- Nombre de archivo sin caracteres peligrosos

**¿Qué protege?**
- Subida de archivos maliciosos
- Desbordamiento de memoria
- Ataques de path traversal
- Consumo excesivo de recursos

---

### **4. Rate Limiting (Middleware)**

**Archivo:** `middleware.ts`

**Límites:**
- **100 requests por minuto** por IP/User-Agent
- Bloqueo temporal de 2 minutos si se detecta spam
- Limpieza automática de registros cada 5 minutos

**Respuesta a abuso:**
- Código HTTP `429 Too Many Requests`
- Header `Retry-After: 60` segundos

**¿Qué protege?**
- Ataques DDoS (Denial of Service)
- Scraping automatizado
- Bots maliciosos
- Abuso de recursos

---

### **5. Monitor de Seguridad en Cliente**

**Archivo:** `app/hooks/useSecurityMonitor.ts`

**Detecta:**
- **Spam de operaciones**: Más de 50 eventos por minuto
- **Automatización**: Detecta Selenium, Puppeteer, Phantom
- **Comportamiento sospechoso**: Patrones de uso anormales

**Acciones:**
- Bloqueo temporal (2 minutos)
- Alertas al usuario
- Logs en consola

**¿Qué protege?**
- Bots automatizados
- Uso abusivo de la herramienta
- Extracción de datos

---

### **6. Protección de Metadata**

**Configuración en compresión:**

```typescript
preserveExif: false  // Elimina metadata potencialmente sensible
```

**¿Qué protege?**
- No filtra ubicación GPS de fotos
- No expone información de cámara
- Protege privacidad del usuario

---

### **7. Timeout de Seguridad**

**Límite:** 30 segundos por imagen

**¿Qué protege?**
- Bloqueo del navegador con imágenes complejas
- Consumo infinito de CPU
- Ataques de agotamiento de recursos

---

## 🚨 **PROTECCIÓN CONTRA ATAQUES COMUNES**

### **1. XSS (Cross-Site Scripting)**

**✅ Protecciones implementadas:**
- Content Security Policy estricta
- React escapa automáticamente el contenido
- No usamos `dangerouslySetInnerHTML` en componentes
- Headers `X-XSS-Protection`

**Riesgo:** BAJO ✅

---

### **2. CSRF (Cross-Site Request Forgery)**

**✅ Protecciones implementadas:**
- Todo procesa en el cliente (no hay API vulnerable)
- SameSite cookies por defecto en Vercel
- Verificación de origen en middleware

**Riesgo:** MUY BAJO ✅

---

### **3. DDoS (Denial of Service)**

**✅ Protecciones implementadas:**
- Rate limiting (100 req/min)
- Límites de tamaño de archivo (10MB)
- Límite de número de archivos (50 imágenes)
- Timeout de compresión (30 segundos)

**⚠️ Protección adicional en Vercel:**
- Vercel tiene protección DDoS automática
- Plan Pro ofrece protección avanzada

**Riesgo:** BAJO ✅ (con Vercel)

---

### **4. Malware Upload**

**✅ Protecciones implementadas:**
- Solo acepta formatos de imagen
- Validación estricta de MIME type
- Procesamiento en navegador (aislado)
- Sin ejecución de código del archivo

**⚠️ Limitación:**
- No hay escaneo antivirus (requiere backend)

**Riesgo:** BAJO ✅ (archivos no se ejecutan)

---

### **5. Bot Scraping**

**✅ Protecciones implementadas:**
- Rate limiting por IP
- Detección de user-agents sospechosos
- Detección de herramientas de automatización
- Bloqueo de Selenium, Puppeteer, etc.

**Riesgo:** MEDIO ⚠️

---

### **6. Hotlinking (Robo de Ancho de Banda)**

**✅ Protecciones implementadas:**
- Validación de referer en middleware
- Headers configurados correctamente
- Todo es cliente (no hay archivos estáticos pesados)

**Riesgo:** MUY BAJO ✅

---

### **7. SQL Injection**

**✅ Protecciones implementadas:**
- No hay base de datos
- No hay backend con SQL

**Riesgo:** NINGUNO ✅

---

## ⚙️ **CONFIGURACIÓN DE VERCEL**

### **1. Activar Vercel Firewall (Plan Pro)**

Si actualizas a Vercel Pro, activa estas protecciones:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Security**
3. Activa:
   - ✅ **Attack Challenge Mode** (bloquea bots)
   - ✅ **DDoS Mitigation**
   - ✅ **Bot Protection**

**Costo:** $20/mes (opcional, pero recomendado)

---

### **2. Configurar Logs y Monitoreo**

Vercel incluye logs básicos GRATIS:

1. **Deployments** → Selecciona tu deploy
2. **Runtime Logs** → Ver requests sospechosos
3. **Analytics** → Ver patrones de tráfico

**⚠️ Alertas:**
- Si ves muchos errores 429 (rate limit), es normal
- Si ves errores 403 (forbidden), revisa los logs

---

### **3. Variables de Entorno**

Si agregas un backend después:

```bash
# .env.local (NUNCA subir a GitHub)
DATABASE_URL=...
API_KEY=...
```

**Reglas:**
- ✅ Usa variables de entorno para secretos
- ✅ Agrega `.env.local` a `.gitignore`
- ✅ Configura en Vercel Dashboard → Settings → Environment Variables

---

## 📊 **MONITOREO Y ALERTAS**

### **Qué monitorear:**

#### **1. Vercel Analytics (Gratis)**
- Visitas por día
- Páginas más vistas
- Performance

#### **2. Runtime Logs (Vercel)**
- Errores 429 (Too Many Requests)
- Errores 403 (Forbidden)
- Errores 500 (Server Error)

#### **3. Google Search Console (Gratis)**
- Si alguien reporta tu sitio
- Problemas de seguridad detectados por Google
- Malware o phishing alerts

### **Cómo configurar alertas:**

1. **Google Search Console:**
   ```
   → Agrega tu dominio: compresor-imagenes.com
   → Verifica propiedad
   → Activa alertas por email
   ```

2. **Vercel:**
   ```
   → Settings → Notifications
   → Activa: Deployment Failed, Downtime Alerts
   ```

---

## 🔒 **MEJORES PRÁCTICAS**

### **1. Mantén Dependencies Actualizadas**

```bash
# Revisa vulnerabilidades
npm audit

# Corrige automáticamente
npm audit fix

# Actualiza packages
npm update
```

**Frecuencia:** Cada 2 semanas

---

### **2. Revisa Logs Regularmente**

**Qué buscar:**
- Picos de tráfico inusuales
- Errores 403/429 excesivos
- Requests de IPs sospechosas
- User-agents de bots

**Frecuencia:** 1 vez por semana

---

### **3. Backup del Código**

**Ya tienes esto:**
- ✅ Repositorio en GitHub
- ✅ Vercel hace deploys automáticos

**Recomendación:**
- Crea tags de versión estables:
  ```bash
  git tag -a v1.0.0 -m "Primera versión estable"
  git push origin v1.0.0
  ```

---

### **4. Configuración de robots.txt**

**Ya implementado:**
```
User-agent: *
Allow: /
Disallow: /api/
```

**¿Por qué?**
- Bloquea bots de acceder a rutas API (si las agregas)
- Permite indexación de contenido público

---

### **5. HTTPS Forzado**

**Automático en Vercel:**
- ✅ Certificado SSL/TLS gratuito
- ✅ Renovación automática
- ✅ Redirección HTTP → HTTPS

**No necesitas hacer nada.**

---

## 🚀 **PROTECCIONES ADICIONALES RECOMENDADAS**

### **1. Cloudflare (Opcional, Gratis)**

Cloudflare agrega una capa adicional de protección:

**Ventajas:**
- ✅ Protección DDoS avanzada
- ✅ Firewall configurable
- ✅ Cache CDN (más rápido)
- ✅ Bot protection mejorado
- ✅ Analytics detallados

**Cómo configurar:**
1. Crea cuenta en [Cloudflare](https://cloudflare.com)
2. Agrega tu dominio `compresor-imagenes.com`
3. Cambia los nameservers en Namecheap a los de Cloudflare
4. Activa **Proxy** (nube naranja)
5. Configura SSL/TLS en "Full (Strict)"

**Costo:** GRATIS (plan básico)

---

### **2. Vercel Pro (Opcional, $20/mes)**

Protecciones avanzadas:

- ✅ Attack Challenge Mode
- ✅ DDoS Protection
- ✅ Firewall configurable
- ✅ Password Protection para previews
- ✅ 100GB de ancho de banda

**¿Cuándo upgradearte?**
- Cuando generes más de $100/mes con AdSense
- Cuando tengas más de 10,000 visitas/mes
- Si sufres ataques frecuentes

---

### **3. reCAPTCHA (Si tienes problema de bots)**

Si en el futuro ves mucho tráfico bot:

```bash
npm install react-google-recaptcha
npm install --save-dev @types/react-google-recaptcha
```

**Implementación básica:**

```typescript
import ReCAPTCHA from "react-google-recaptcha";

// En tu componente
<ReCAPTCHA
  sitekey="TU_SITE_KEY"
  onChange={handleRecaptcha}
/>
```

**Costo:** GRATIS (hasta 1M requests/mes)

---

### **4. Web Application Firewall (WAF)**

**Opciones:**

| Servicio | Costo | Nivel de Protección |
|----------|-------|---------------------|
| Cloudflare | Gratis | Bueno |
| Vercel Pro | $20/mes | Muy bueno |
| AWS WAF | Variable | Excelente |

**Recomendación:** Empieza con **Cloudflare gratis**.

---

## 🔍 **ATAQUES ESPECÍFICOS Y CÓMO LOS PREVENIMOS**

### **1. DDoS Attack (Ataque de Denegación de Servicio)**

**Objetivo:** Saturar tu sitio con millones de requests.

**✅ Protecciones:**
- Rate limiting (100 req/min por IP)
- Vercel auto-scale (maneja tráfico alto)
- Cloudflare (opcional) bloquea automáticamente

**Riesgo:** BAJO ✅

---

### **2. XSS (Cross-Site Scripting)**

**Objetivo:** Inyectar JavaScript malicioso.

**✅ Protecciones:**
- Content Security Policy
- React escapa HTML automáticamente
- No usamos `innerHTML`
- Headers `X-XSS-Protection`

**Riesgo:** MUY BAJO ✅

---

### **3. Clickjacking**

**Objetivo:** Poner tu sitio en un iframe invisible para engañar usuarios.

**✅ Protecciones:**
- Header `X-Frame-Options: SAMEORIGIN`
- CSP `frame-ancestors 'self'`

**Riesgo:** NINGUNO ✅

---

### **4. Malware Upload**

**Objetivo:** Subir archivos maliciosos que infecten tu servidor.

**✅ Protecciones:**
- Solo acepta JPG, PNG, WebP
- Validación de MIME type
- Procesamiento en navegador (aislado)
- Sin almacenamiento en servidor

**⚠️ Nota:** Como todo es cliente, los archivos nunca llegan a tu servidor.

**Riesgo:** MUY BAJO ✅

---

### **5. Bot Scraping**

**Objetivo:** Automatizar el uso de tu herramienta sin generar AdSense revenue.

**✅ Protecciones:**
- Detección de Selenium, Puppeteer
- Rate limiting agresivo
- Bloqueo de user-agents sospechosos
- Monitor de comportamiento

**⚠️ Limitación:** Bots sofisticados pueden evadirlo.

**Riesgo:** MEDIO ⚠️

**Solución avanzada:** reCAPTCHA (si es necesario)

---

### **6. Memory Exhaustion**

**Objetivo:** Subir imágenes gigantes para saturar RAM del navegador.

**✅ Protecciones:**
- Límite de 10MB por archivo
- Límite de 50 archivos totales
- Timeout de 30 segundos por compresión
- Liberación automática de memoria (URL.revokeObjectURL)

**Riesgo:** BAJO ✅

---

## 📈 **NIVELES DE RIESGO POR TIPO DE ATAQUE**

| Ataque | Riesgo Actual | Protección | Acción Requerida |
|--------|---------------|------------|------------------|
| XSS | MUY BAJO ✅ | CSP + React | Ninguna |
| CSRF | MUY BAJO ✅ | Cliente | Ninguna |
| DDoS | BAJO ✅ | Rate Limit + Vercel | Opcional: Cloudflare |
| Clickjacking | NINGUNO ✅ | Headers | Ninguna |
| Malware | MUY BAJO ✅ | Validación | Ninguna |
| Bots | MEDIO ⚠️ | Detection + Rate Limit | Monitorear |
| SQL Injection | NINGUNO ✅ | No DB | Ninguna |
| Memory Attack | BAJO ✅ | Límites + Timeout | Ninguna |

---

## 🔧 **CONFIGURACIÓN DESPUÉS DEL DEPLOY**

### **Paso 1: Verifica Headers**

Después de hacer deploy, verifica que los headers funcionen:

```bash
# En PowerShell
curl -I https://compresor-imagenes.com

# O visita:
https://securityheaders.com/?q=https://compresor-imagenes.com
```

**Resultado esperado:** Grade A o A+

---

### **Paso 2: Test de Seguridad**

Prueba tu sitio en estas herramientas:

1. **[SecurityHeaders.com](https://securityheaders.com)**
   - Verifica tus headers HTTP

2. **[Mozilla Observatory](https://observatory.mozilla.org)**
   - Score de seguridad general
   - Meta: Grade A

3. **[SSL Labs](https://www.ssllabs.com/ssltest/)**
   - Verifica tu certificado SSL
   - Meta: Grade A+

4. **[Web.dev Measure](https://web.dev/measure/)**
   - Performance y seguridad
   - Meta: 90+ en todas las métricas

---

### **Paso 3: Configura Google Search Console**

Para recibir alertas de seguridad de Google:

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. **Add Property** → `compresor-imagenes.com`
3. Verifica con DNS (o Vercel meta tag)
4. **Settings** → **Email notifications** → Activa todas

**Alertas que recibirás:**
- Malware detectado
- Hacking attempts
- Penalizaciones de seguridad

---

## 📋 **CHECKLIST DE SEGURIDAD**

Después de hacer deploy, verifica:

- [ ] Headers de seguridad funcionan (SecurityHeaders.com)
- [ ] HTTPS forzado (http:// redirige a https://)
- [ ] Rate limiting funciona (prueba con 100+ requests rápidos)
- [ ] Validación de archivos funciona (prueba subir PDF, .exe)
- [ ] Límite de 10MB funciona (prueba con archivo grande)
- [ ] Timeout de 30s funciona (carga la app en diferentes navegadores)
- [ ] Google Search Console configurado
- [ ] Vercel notifications activadas

---

## 🛠️ **MANTENIMIENTO CONTINUO**

### **Cada Semana:**
- [ ] Revisa Vercel Runtime Logs
- [ ] Verifica Analytics (tráfico inusual)
- [ ] Chequea Google Search Console

### **Cada 2 Semanas:**
- [ ] Ejecuta `npm audit`
- [ ] Actualiza dependencies si hay vulnerabilidades

### **Cada Mes:**
- [ ] Revisa SecurityHeaders.com score
- [ ] Test de velocidad y seguridad en Web.dev
- [ ] Verifica que certificado SSL no expira pronto

### **Cada 3 Meses:**
- [ ] Actualiza todas las dependencies: `npm update`
- [ ] Revisa nuevas vulnerabilidades conocidas
- [ ] Considera actualizaciones de seguridad de Next.js

---

## 🚨 **QUÉ HACER SI TE ATACAN**

### **Síntomas de ataque:**
1. **Tráfico repentino muy alto** (10x normal)
2. **Muchos errores 429** en logs
3. **Sitio muy lento** para todos
4. **Alertas de Google Search Console**

### **Respuesta inmediata:**

#### **1. Identifica el ataque:**
```
Vercel Dashboard → Runtime Logs → Filtra por errores
```

#### **2. Bloquea IPs sospechosas:**

Si tienes Cloudflare:
```
Dashboard → Firewall → IP Access Rules → Block
```

Si solo usas Vercel:
```
Contacta a Vercel Support (responden rápido)
```

#### **3. Activa modo bajo ataque:**

**Cloudflare:**
```
Dashboard → Quick Actions → Under Attack Mode
```

Esto activa challenge page para verificar que son humanos.

#### **4. Reduce rate limiting temporalmente:**

En `middleware.ts`:
```typescript
const RATE_LIMIT_REQUESTS = 20; // Baja de 100 a 20
```

Haz deploy inmediato.

---

## 💡 **RECOMENDACIONES FINALES**

### **Prioridad ALTA (Hazlo YA):**
1. ✅ Deploy con los nuevos cambios de seguridad
2. ✅ Verifica headers en SecurityHeaders.com
3. ✅ Configura Google Search Console
4. ✅ Activa notificaciones en Vercel

### **Prioridad MEDIA (Próximas semanas):**
1. ⏳ Considera agregar Cloudflare (gratis)
2. ⏳ Configura monitoring semanal
3. ⏳ Crea proceso de `npm audit`

### **Prioridad BAJA (Cuando escales):**
1. 💰 Upgrade a Vercel Pro ($20/mes)
2. 💰 Considera reCAPTCHA si hay muchos bots
3. 💰 WAF avanzado si generas +$500/mes

---

## 📚 **RECURSOS ÚTILES**

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Vercel Security Docs:** https://vercel.com/docs/security
- **Next.js Security:** https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- **SecurityHeaders.com:** https://securityheaders.com/
- **Mozilla Observatory:** https://observatory.mozilla.org/

---

## ✅ **RESUMEN**

Tu aplicación ahora tiene **7 capas de protección:**

1. ✅ Headers de seguridad HTTP (CSP, XSS, etc.)
2. ✅ Validación estricta de archivos
3. ✅ Rate limiting (100 req/min)
4. ✅ Monitor de seguridad en cliente
5. ✅ Timeout de operaciones (30s)
6. ✅ Protección contra bots
7. ✅ Eliminación de metadata sensible

**Nivel de seguridad:** ALTO para una app sin backend 🛡️

**Próximo paso:** Deploy y testing de seguridad.
