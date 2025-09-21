# El Vals de la Novia - Landing Page

Página de aterrizaje profesional para "El Vals de la Novia", un servicio de asesoría boutique para novias en España.

## 🚀 Características

- **Landing Page Moderna**: Diseño limpio y profesional optimizado para conversiones
- **Modal de Reserva**: Formulario integrado para solicitudes de consulta
- **Responsive Design**: Funciona perfectamente en móvil y escritorio
- **Estados Interactivos**: Loading states, validación y confirmaciones
- **Optimizado para UX**: Barra CTA fija y navegación intuitiva

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **React Hooks** - Manejo de estado moderno

## 📋 Requisitos

- Node.js 18 o superior
- npm o yarn

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone <repository-url>
cd vals-novia-landing

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
vals-novia-landing/
├── src/
│   └── app/
│       ├── page.tsx          # Componente principal
│       ├── layout.tsx        # Layout de la aplicación
│       └── globals.css       # Estilos de Tailwind
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## ✨ Funcionalidades

### Secciones de la Landing Page
- **Header**: Presentación del servicio con CTAs principales
- **¿Qué es esto?**: Explicación clara del servicio
- **Qué incluye**: Beneficios y entregables
- **Cómo funciona**: Proceso paso a paso
- **FAQ**: Preguntas frecuentes

### Modal de Reserva
- Formulario con 4 campos esenciales:
  - Nombre completo (requerido)
  - Email (requerido)
  - Fecha aproximada de boda (opcional)
  - Mensaje/detalles (opcional)
- Validación HTML5 nativa
- Estados de loading y éxito
- Simulación de envío de email

## 🎨 Diseño

### Paleta de Colores
- **Background**: `#F4E7E4` (rosa suave)
- **Texto**: `#1F1F1F` (negro oscuro)
- **Acentos**: Blancos semitransparentes con blur

### Principios de Diseño
- **Mobile First**: Optimizado para dispositivos móviles
- **Conversion Focused**: CTAs prominentes y formulario simplificado
- **Modern UI**: Bordes redondeados, sombras suaves, efectos de blur

## 📧 Integración de Email

Actualmente el formulario simula el envío de emails. Para integrar un servicio real:

1. **Reemplazar la función `handleSubmit`** en `src/app/page.tsx`
2. **Agregar servicio de email** (SendGrid, Resend, Nodemailer, etc.)
3. **Configurar variables de entorno** para las credenciales del servicio

```typescript
// Ejemplo de integración con SendGrid
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setIsSuccess(true);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm run build
# Conectar con Vercel CLI o GitHub
```

### Netlify
```bash
npm run build
# Subir la carpeta .next/out
```

### Servidor Propio
```bash
npm run build
npm run start
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificar código con ESLint

## 🔮 Próximas Mejoras

- [ ] Integración con servicio de email real
- [ ] Analytics y tracking de conversiones
- [ ] Sistema de calendario para reservas
- [ ] Integración con CRM
- [ ] Optimización SEO avanzada
- [ ] Tests automatizados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**El Vals de la Novia** - Asesoría Boutique para novias • Transformamos tu estrés en la boda de tus sueños