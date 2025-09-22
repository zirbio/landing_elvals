'use client';

import { useState } from 'react';

export default function Landing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      weddingDate: '',
      message: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsSuccess(false);
      setFormData({ name: '', email: '', weddingDate: '', message: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Detectar si estamos en desarrollo o producción
        const isDevelopment = window.location.hostname === 'localhost';
        const endpoint = isDevelopment
          ? '/api/send-email'  // API Route para desarrollo
          : '/.netlify/functions/send-email';  // Netlify Function para producción

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          console.log('Email enviado correctamente:', data);
        } else {
          console.error('Error del servidor:', data.error);
          alert(`Error: ${data.error || 'No se pudo enviar el email'}`);
        }
      } catch (error) {
        console.error('Error enviando email:', error);
        alert('Error de conexión. Por favor, intenta de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#F4E7E4] text-[#1F1F1F]">
        {/* Barra fija CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-black/10">
          <div className="mx-auto max-w-4xl flex items-center justify-between gap-4 px-4 py-3">
            <p className="text-sm md:text-base">Asesoría Boutique • Sesión de <strong>60–90 min</strong> · Plazas limitadas</p>
            <button onClick={openModal} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 shadow-sm border border-black/10 bg-[#1F1F1F] text-white hover:opacity-90 transition">
              Reservar mi sesión
            </button>
          </div>
        </div>

        {/* Contenido */}
        <header className="mx-auto max-w-4xl px-4 pt-12 pb-6">
          <div className="text-center">
            <p className="tracking-[0.2em] text-xs md:text-sm uppercase">EL VALS DE LA NOVIA</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif">Asesoría Boutique</h1>
            <p className="mt-4 text-lg md:text-xl italic max-w-2xl mx-auto">(60–90 min) – dejas tu boda preparada y lista en tan solo 1 hora*</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={openModal} className="rounded-2xl px-6 py-3 bg-[#1F1F1F] text-white shadow-sm hover:opacity-90 transition">Reservar mi sesión</button>
              <a href="#como" className="rounded-2xl px-6 py-3 border border-black/10 bg-white/70 hover:bg-white transition">Cómo funciona</a>
            </div>
            <p className="mt-3 text-xs text-black/60">*En la propia sesión de 60–90 min dejas tu boda <em>planificada</em>; después recibes una guía y selección cuidada para ejecutar sin estrés.</p>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 pb-28">
          {/* ¿Qué es esto? */}
          <section id="quees" className="rounded-2xl bg-white/70 p-6 md:p-8 shadow-sm border border-black/10">
            <h2 className="text-2xl md:text-3xl font-serif mb-3">¿Qué es esto?</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Una <strong>consultoría one‑to‑one</strong> para novias (y parejas) donde resolvemos tu primer gran bloqueo: por dónde empezar y qué proveedores elegir.
              En una sesión de <strong>60–90 minutos</strong> definimos el estilo, prioridades y presupuesto realista, y te llevas tu boda <strong>diseñada a tu estilo y medida</strong>.
            </p>
          </section>

          {/* Qué incluye */}
          <section id="incluye" className="mt-10 grid gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-serif">Qué incluye</h2>
            <ul className="grid gap-3 md:grid-cols-3">
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="font-medium">Brief de estilo + prioridades</p>
                <p className="text-sm mt-2 text-black/70">Aterrizamos tu visión (3 palabras clave, paleta y presupuesto orientativo).</p>
              </li>
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="font-medium">Selección de proveedores esenciales</p>
                <p className="text-sm mt-2 text-black/70">Shortlist cuidada (2–3 por categoría) con contacto y orden recomendado.</p>
              </li>
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="font-medium">Guía de próximos pasos</p>
                <p className="text-sm mt-2 text-black/70">Timeline 90 días + checklist. Entrega en <strong>7–10 días</strong> en PDF/Notion.</p>
              </li>
            </ul>
          </section>

          {/* Cómo funciona */}
          <section id="como" className="mt-12">
            <h2 className="text-2xl md:text-3xl font-serif">Cómo funciona</h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-3">
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="text-sm uppercase tracking-wide text-black/60">Paso 1</p>
                <h3 className="font-medium mt-1">Reserva + cuestionario (3–5 min)</h3>
                <p className="text-sm mt-2 text-black/70">Elige día en el calendario y completa un breve cuestionario con fecha, invitados, estilo y prioridades.</p>
              </li>
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="text-sm uppercase tracking-wide text-black/60">Paso 2</p>
                <h3 className="font-medium mt-1">Sesión 60–90 min (online, Zoom)</h3>
                <p className="text-sm mt-2 text-black/70">Definimos estilo y presupuesto, resolvemos dudas y mapeamos proveedores. Sales con tu boda <em>diseñada a tu estilo y medida</em>.</p>
              </li>
              <li className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <p className="text-sm uppercase tracking-wide text-black/60">Paso 3</p>
                <h3 className="font-medium mt-1">Guía personalizada en 7–10 días</h3>
                <p className="text-sm mt-2 text-black/70">Recibes tu hoja de ruta + shortlist y próximos pasos listos para ejecutar sin estrés.</p>
              </li>
            </ol>
            <div className="mt-6">
              <button onClick={openModal} className="inline-flex rounded-2xl px-6 py-3 bg-[#1F1F1F] text-white shadow-sm hover:opacity-90 transition">Reservar mi sesión</button>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-12">
            <h2 className="text-2xl md:text-3xl font-serif">FAQ</h2>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <h3 className="font-medium">¿La sesión es online?</h3>
                <p className="text-sm mt-2 text-black/70">Las sesiones son 100% online por Zoom (cualquier ciudad). No realizo sesiones presenciales.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <h3 className="font-medium">¿Cuándo recibo la guía y la selección de proveedores?</h3>
                <p className="text-sm mt-2 text-black/70">Entre <strong>7 y 10 días</strong> tras la sesión. Te llegará por email en PDF o enlace a Notion, como prefieras.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <h3 className="font-medium">Política de cambios y cancelaciones</h3>
                <p className="text-sm mt-2 text-black/70">Puedes reprogramar gratis hasta 48 h antes. Cancelaciones con menos de 48 h implican un cargo del 50% por bloqueo de agenda.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-5 shadow-sm border border-black/10">
                <h3 className="font-medium">¿Qué necesito de ti antes de la sesión?</h3>
                <p className="text-sm mt-2 text-black/70">Un moodboard o 3 referencias de estilo, rango de presupuesto, ciudad/fecha deseada y tus 3 dudas principales.</p>
              </div>
            </div>
          </section>

          {/* Nota legal breve */}
          <p className="mt-10 text-xs text-black/50">
            Al reservar aceptas los términos del servicio y la política de privacidad (RGPD). La selección de proveedores es orientativa y su disponibilidad puede variar.
          </p>
        </main>

        {/* Modal de Reserva */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <div>
                  <h2 className="text-2xl font-serif text-[#1F1F1F]">Reservar Sesión</h2>
                  <p className="text-sm text-black/60 mt-1">Asesoría Boutique • 60–90 min</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo Nombre */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#1F1F1F] focus:border-transparent transition placeholder-black/40"
                        placeholder="Tu nombre y apellido"
                      />
                    </div>

                    {/* Campo Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#1F1F1F] focus:border-transparent transition placeholder-black/40"
                        placeholder="tu@email.com"
                      />
                    </div>

                    {/* Campo Fecha de Boda */}
                    <div>
                      <label htmlFor="weddingDate" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                        Fecha aproximada de la boda
                      </label>
                      <input
                        type="text"
                        id="weddingDate"
                        name="weddingDate"
                        value={formData.weddingDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#1F1F1F] focus:border-transparent transition placeholder-black/40"
                        placeholder="Ej: Junio 2025, Verano 2025..."
                      />
                    </div>

                    {/* Campo Mensaje */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#1F1F1F] mb-2">
                        Cuéntanos sobre tu boda
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:ring-2 focus:ring-[#1F1F1F] focus:border-transparent transition placeholder-black/40 resize-none"
                        placeholder="Estilo que tienes en mente, presupuesto aproximado, dudas principales..."
                      />
                    </div>

                    {/* Botón Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#1F1F1F] text-white rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeOpacity="0.25"/>
                            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        'Enviar solicitud de reserva'
                      )}
                    </button>

                    {/* Nota */}
                    <p className="text-xs text-black/50 text-center">
                      Te contactaremos en menos de 24h para confirmar tu sesión
                    </p>
                  </form>
                ) : (
                  // Estado de Éxito
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif text-[#1F1F1F] mb-2">¡Solicitud enviada!</h3>
                    <p className="text-black/60 mb-6">
                      Hemos recibido tu solicitud de reserva. Te contactaremos en menos de 24 horas para confirmar tu sesión.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 bg-[#1F1F1F] text-white rounded-xl hover:opacity-90 transition"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }