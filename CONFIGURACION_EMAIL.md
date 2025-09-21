# 📧 Configuración del Servicio de Email - Paso a Paso

Esta guía te explica exactamente cómo configurar el envío de emails real para tu landing page de "El Vals de la Novia".

## 🎯 ¿Qué hace el sistema de email?

Cuando alguien completa el formulario de reserva:
1. **Recibes un email** con todos los datos de la futura novia
2. **Ella recibe un email de confirmación** profesional
3. **Todo es automático** - no necesitas hacer nada más

## 📋 Lo que necesitas hacer (30 minutos máximo):

### 1. 🚀 Crear cuenta en Resend (Recomendado - GRATIS)

**¿Por qué Resend?**
- ✅ 3,000 emails gratis al mes (más que suficiente)
- ✅ Diseñado específicamente para desarrolladores
- ✅ Muy fácil de configurar
- ✅ Emails llegan a inbox (no spam)
- ✅ Templates HTML bonitos incluidos

**Pasos:**
1. Ve a [resend.com](https://resend.com)
2. Haz clic en "Sign Up"
3. Crea tu cuenta con el email donde quieres recibir las reservas
4. Confirma tu email

### 2. 🔑 Obtener tu API Key

1. **Entra a tu dashboard** de Resend
2. Ve a la sección **"API Keys"** en el menú lateral
3. Haz clic en **"Create API Key"**
4. Dale un nombre como "Landing El Vals"
5. Selecciona **"Full access"** (necesario para enviar emails)
6. **Copia la API key** (algo como `re_123abc456def...`)
7. **¡IMPORTANTE!** Guárdala en un lugar seguro, solo la verás una vez

### 3. 📁 Configurar Variables de Entorno

1. **En tu proyecto**, crea un archivo llamado `.env.local` (en la raíz del proyecto)
2. **Copia y pega esto**, reemplazando con tus datos:

```bash
# Configuración de Email - Resend
RESEND_API_KEY=re_TU_API_KEY_AQUI
BUSINESS_EMAIL=tu-email@tudominio.com
```

**Ejemplo real:**
```bash
RESEND_API_KEY=re_ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZ567abc890DEF
BUSINESS_EMAIL=maria@elvalsdelanova.com
```

### 4. 📧 Configurar Dominio (OPCIONAL pero recomendado)

**Opción A: Sin dominio personalizado (Más fácil)**
- Los emails se enviarán desde `reservas@elvalsdelanova.com`
- Funciona perfectamente, pero Resend añadirá una nota de "vía resend.dev"

**Opción B: Con tu dominio personalizado (Más profesional)**
1. En Resend, ve a **"Domains"**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `elvalsdelanova.com`)
4. Sigue las instrucciones para añadir los registros DNS
5. Una vez verificado, actualiza el email "from" en el código

### 5. ✅ Probar que funciona

1. **Inicia tu servidor local:**
   ```bash
   npm run dev
   ```

2. **Ve a http://localhost:3000**

3. **Llena el formulario de reserva** con datos reales (usa tu email)

4. **Si funciona correctamente:**
   - Verás "¡Solicitud enviada!" en la web
   - Recibirás el email de notificación en tu bandeja
   - El email de prueba recibirá la confirmación

5. **Si hay problemas:**
   - Abre la consola del navegador (F12)
   - Busca errores en la pestaña "Console"
   - Revisa que la API key esté correcta

## 🚨 Problemas Comunes y Soluciones

### ❌ "Error: API key inválida"
- **Solución:** Revisa que hayas copiado correctamente la API key de Resend
- **Verifica:** Que el archivo `.env.local` esté en la raíz del proyecto

### ❌ "Error 403: Domain not verified"
- **Solución:** Usa el dominio por defecto temporalmente o completa la verificación DNS

### ❌ Los emails van a spam
- **Solución:** Configura tu dominio personalizado en Resend
- **Temporal:** Pide a los clientes que revisen spam la primera vez

### ❌ No recibo emails
- **Verifica:** Que `BUSINESS_EMAIL` en `.env.local` sea tu email correcto
- **Revisa:** La carpeta de spam
- **Prueba:** Con otro email diferente

## 🔄 Alternativas a Resend (si tienes problemas)

### Option 1: SendGrid (Más robusto)
- 100 emails gratis al día
- Más complejo de configurar
- Muy confiable para volumen alto

### Option 2: EmailJS (Sin backend)
- Todo desde el frontend
- Menos profesional
- Más fácil para principiantes

### Option 3: Formspree (Todo en uno)
- Formularios + emails
- Plan gratuito limitado
- Menor personalización

## 📊 Monitoreo y Analytics

Una vez configurado, puedes ver en tu dashboard de Resend:
- ✅ Emails enviados exitosamente
- ❌ Emails fallidos y por qué
- 📈 Estadísticas de apertura y clics
- 📧 Historial completo de emails

## 🔒 Seguridad

- ✅ Las API keys están protegidas en `.env.local`
- ✅ Los formularios tienen validación
- ✅ Rate limiting incluido para prevenir spam
- ✅ Nunca se almacenan emails en la base de datos

## 🚀 Deploy a Producción

**Para Vercel:**
1. Sube tu código a GitHub
2. Conecta tu repo con Vercel
3. En Vercel, ve a "Settings" > "Environment Variables"
4. Añade las mismas variables que tienes en `.env.local`

**Para Netlify:**
1. En tu dashboard, ve a "Site settings" > "Environment variables"
2. Añade `RESEND_API_KEY` y `BUSINESS_EMAIL`

## 💡 Próximos Pasos (Opcionales)

Una vez que todo funcione, puedes mejorar:
- [ ] Integrar con un CRM (HubSpot, Mailchimp)
- [ ] Añadir notificaciones por WhatsApp
- [ ] Crear autoresponders con más información
- [ ] Integrar con calendario para reservas automáticas
- [ ] Añadir analytics de conversión

## 🆘 ¿Necesitas ayuda?

Si algo no funciona:
1. **Revisa la consola** del navegador en Developer Tools
2. **Verifica los logs** de Resend en su dashboard
3. **Prueba con datos diferentes** (otro email, etc.)
4. **Contacta al desarrollador** con pantallazos de los errores

---

**⏱️ Tiempo estimado de configuración: 15-30 minutos**

**💰 Costo: GRATIS** (hasta 3,000 emails/mes con Resend)

**🎯 Resultado: Sistema de reservas 100% automático y profesional**