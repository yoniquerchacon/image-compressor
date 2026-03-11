# 🔧 Configurar DNS para Google Search Console

## 📋 **PASO A PASO**

### **1. En Google Search Console (tu imagen 3)**

Ya tienes el código de verificación:
```
google-site-verification=vZjt9xYtNLmt4ivvSXWSVmKCUdHM55uIy
```

✅ **Copia ese código** (ya lo hiciste con el botón "COPIAR")

---

### **2. En Vercel - Agregar Registro TXT**

Estás en la pantalla correcta (tu imagen 2). Ahora:

#### **Opción A: Agregar Nuevo Record**

1. En la pantalla que estás viendo (DNS Records):
   
   **Busca el botón "Add" o "Add DNS Preset"** (arriba a la derecha)

2. Cuando aparezca el formulario:
   ```
   Name:        @ (o déjalo vacío)
   Type:        TXT
   Value:       google-site-verification=vZjt9xYtNLmt4ivvSXWSVmKCUdHM55uIy
   TTL:         60 (o el default)
   ```

3. Click en **"Save"** o **"Add"**

#### **Opción B: Si no ves botón "Add"**

Puede que necesites ir a:

1. En Vercel Dashboard: `Domains` → `compresor-imagenes.com`
2. Scroll hacia abajo hasta **"DNS Records"**
3. Click en **"Add"** o **"Add Record"**
4. Llena los campos igual que arriba

---

### **3. Configuración Exacta en Vercel**

**IMPORTANTE:** En Vercel, cuando agregas un TXT record para Google Search Console:

| Campo | Valor |
|-------|-------|
| **Name** | `@` o déjalo vacío |
| **Type** | `TXT` |
| **Value** | `google-site-verification=vZjt9xYtNLmt4ivvSXWSVmKCUdHM55uIy` |
| **TTL** | `60` (default) |
| **Comment** | "Google Search Console verification" |

**⚠️ NOTA SOBRE EL SUBDOMAIN:**

Veo que tienes un record con:
- **Name:** `subdomain`
- **Type:** `A`
- **Value:** `76.76.21.21`

**Esto NO es necesario.** Puedes eliminarlo si quieres, NO afecta tu sitio principal.

---

### **4. Eliminar el Subdomain Innecesario (Opcional)**

Si quieres limpiarlo:

1. En la misma pantalla (DNS Records)
2. Busca el record que dice `subdomain` con IP `76.76.21.21`
3. Click en los **3 puntos** `...` o botón de **eliminar**
4. Confirma eliminación

---

### **5. Después de Agregar el TXT**

1. **Espera 2-5 minutos** (DNS tarda en propagarse)

2. **Vuelve a Google Search Console:**
   - Click en **"VERIFICAR"** (botón azul abajo)

3. **Si dice "Verificado":**
   ✅ ¡Listo! Ya tienes Google Search Console configurado

4. **Si dice "No se pudo verificar":**
   - Espera 10 minutos más
   - Verifica que el TXT se agregó correctamente:
     ```
     nslookup -type=TXT compresor-imagenes.com
     ```
   - Intenta de nuevo

---

## 🔍 **Verificar que el TXT está configurado**

Después de agregar el record en Vercel, verifica:

```powershell
# En PowerShell
nslookup -type=TXT compresor-imagenes.com
```

**Resultado esperado:**
```
compresor-imagenes.com  text = "google-site-verification=vZjt9xYtNLmt4ivvSXWSVmKCUdHM55uIy"
```

---

## 🎯 **RESUMEN VISUAL**

### DNS Records que DEBES tener:

| Name | Type | Value | Propósito |
|------|------|-------|-----------|
| `@` | `A` | (IP de Vercel) | Tu sitio principal |
| `www` | `CNAME` | `cname.vercel-dns.com` | Redirección www |
| `@` | `TXT` | `google-site-verification=...` | Google Search Console |

### DNS Records que NO necesitas:
| Name | Type | Value | ¿Eliminar? |
|------|------|-------|------------|
| `subdomain` | `A` | `76.76.21.21` | ✅ Sí (opcional) |

---

## ✅ **CHECKLIST**

- [ ] Agregar registro TXT en Vercel DNS
- [ ] Esperar 5 minutos
- [ ] Verificar en Google Search Console
- [ ] (Opcional) Eliminar subdomain innecesario
- [ ] Verificar que el sitio sigue funcionando

---

## ❓ **¿Necesitas Ayuda?**

Si no encuentras el botón "Add" en Vercel:

1. Ve al inicio de Vercel Dashboard
2. Click en tu proyecto **"image-compressor-gjmy"**
3. Click en **"Settings"** (arriba)
4. Click en **"Domains"** (menú lateral izquierdo)
5. Busca `compresor-imagenes.com` y click en él
6. Scroll abajo hasta **"DNS Records"**
7. Ahí debe estar el botón **"Add"**

---

**¡Continúa cuando hayas agregado el TXT record!** 🚀
