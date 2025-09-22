# 🚀 Guía de Deployment en Netlify con Email Funcional

Esta guía te explica paso a paso cómo desplegar tu landing page en Netlify con el sistema de emails completamente funcional.

## 📋 Pre-requisitos

- ✅ Cuenta de Netlify (gratis)
- ✅ Cuenta de Resend con API key
- ✅ Código subido a GitHub

## 🔧 Pasos de Deployment

### 1. **Deploy en Netlify**

#### Opción A: Desde Git (Recomendado)
1. Ve a [netlify.com](https://netlify.com) y haz login
2. Haz clic en **"New site from Git"**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `landing_elvals`
5. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Haz clic en **"Deploy site"**

#### Opción B: Deploy manual
1. Ejecuta en tu computadora:
   ```bash
   npm run build
   ```
2. Arrastra la carpeta `out` a Netlify

### 2. **Configurar Variables de Entorno**

1. **En tu dashboard de Netlify**, ve a:
   - **Site settings** → **Environment variables**

2. **Añade estas variables**:
   ```
   RESEND_API_KEY=tu_resend_api_key_aqui
   BUSINESS_EMAIL=tu_email_de_negocio@dominio.com
   NODE_ENV=production
   ```

3. **Guarda los cambios**

### 3. **Redeploy del sitio**

1. Ve a **"Deploys"** en tu dashboard
2. Haz clic en **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Espera a que termine el deployment

## ✅ **Verificar que todo funciona**

### Test del formulario:
1. Ve a tu sitio en Netlify (ej: `https://amazing-site-123.netlify.app`)
2. Completa el formulario de reserva
3. Deberías recibir el email en tu email de negocio configurado

### Si NO funciona:
1. **Check las Functions**: Ve a **Functions** en el dashboard de Netlify
2. **Revisar logs**: Haz clic en `send-email` function y revisa los logs
3. **Variables**: Verifica que las variables de entorno estén configuradas

## 🔍 **Troubleshooting**

### **Error: "Function not found"**
- Verifica que existe `netlify/functions/send-email.js`
- Redeploy el sitio

### **Error: "Missing API key"**
- Ve a **Site settings** → **Environment variables**
- Verifica que `RESEND_API_KEY` esté configurado
- Redeploy después de añadir variables

### **Error: "Cannot find module 'tailwindcss'"**
- Verifica que Tailwind esté en `dependencies` (no en `devDependencies`)
- Cambia el publish directory a `out` (no `.next`)
- Si persiste, borra `node_modules` y `package-lock.json`, luego `npm install`

### **Error: "CORS"**
- La función ya incluye headers de CORS
- Si persiste, contacta soporte de Netlify

### **Build fails after "Creating optimized build"**
- Revisa el log completo de deployment en Netlify
- Busca errores específicos después de esta línea
- Generalmente indica problemas con dependencias

### **Emails no llegan**
- Verifica que la API key de Resend sea válida
- Confirma que tu email de negocio esté verificado en Resend
- Revisa los logs de la función en Netlify

## 📱 **URLs importantes**

- **Tu sitio**: Se te asignará automáticamente (ej: `https://amazing-site-123.netlify.app`)
- **Función de email**: `https://tu-sitio.netlify.app/.netlify/functions/send-email`
- **Dashboard Netlify**: [app.netlify.com](https://app.netlify.com)
- **Dashboard Resend**: [resend.com/dashboard](https://resend.com/dashboard)

## 🎯 **Dominio personalizado (Opcional)**

Si tienes un dominio personalizado:

1. **En Netlify**: Site settings → Domain management → Add custom domain
2. **En tu proveedor DNS**: Apunta el dominio a Netlify
3. **SSL**: Netlify configurará HTTPS automáticamente

## 📈 **Después del deployment**

### Funcionalidades disponibles:
- ✅ **Landing page** completamente funcional
- ✅ **Formulario de reserva** operativo
- ✅ **Emails automáticos** (negocio + confirmación)
- ✅ **HTTPS** activado automáticamente
- ✅ **CDN global** de Netlify

### Para monitorear:
- **Netlify Analytics**: Ver visitantes y formularios completados
- **Resend Dashboard**: Ver emails enviados y tasas de apertura
- **Functions logs**: Debugging si hay problemas

## 🚀 **¡Listo!**

Tu landing page está ahora desplegada y completamente funcional. Los clientes pueden:
1. Visitar tu sitio
2. Completar el formulario
3. Recibir confirmación automática
4. Tú recibes los datos inmediatamente

**¿Tienes problemas?** Revisa los logs en Netlify Dashboard → Functions → send-email.