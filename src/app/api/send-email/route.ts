import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, weddingDate, message } = body;

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno estén configuradas
    const businessEmail = process.env.BUSINESS_EMAIL;
    if (!businessEmail) {
      return NextResponse.json(
        { error: 'BUSINESS_EMAIL no está configurado en las variables de entorno' },
        { status: 500 }
      );
    }

    // Email para el negocio (notificación de nueva reserva)
    const businessEmailData = {
      from: 'onboarding@resend.dev', // Dominio verificado de Resend para pruebas
      reply_to: businessEmail,
      to: [businessEmail], // Email verificado en Resend
      subject: `🌸 Nueva Solicitud de Reserva - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4E7E4; padding: 20px; border-radius: 16px;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1F1F1F; font-size: 24px; margin-bottom: 20px; font-family: Georgia, serif;">
              ✨ Nueva Solicitud de Asesoría Boutique
            </h1>

            <div style="background-color: #F4E7E4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1F1F1F; font-size: 18px; margin-bottom: 15px;">Datos de la Futura Novia:</h2>

              <p style="margin: 8px 0; color: #1F1F1F;">
                <strong>Nombre:</strong> ${name}
              </p>

              <p style="margin: 8px 0; color: #1F1F1F;">
                <strong>Email:</strong>
                <a href="mailto:${email}" style="color: #1F1F1F; text-decoration: none; background-color: white; padding: 2px 6px; border-radius: 4px;">
                  ${email}
                </a>
              </p>

              ${weddingDate ? `
                <p style="margin: 8px 0; color: #1F1F1F;">
                  <strong>Fecha de Boda:</strong> ${weddingDate}
                </p>
              ` : ''}

              ${message ? `
                <div style="margin-top: 15px;">
                  <strong style="color: #1F1F1F;">Mensaje:</strong>
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-top: 5px; color: #1F1F1F; font-style: italic;">
                    "${message}"
                  </div>
                </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Solicitud de Asesoría Boutique - El Vals de la Novia"
                 style="background-color: #1F1F1F; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; font-weight: 500;">
                Responder Directamente
              </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                El Vals de la Novia • Asesoría Boutique<br>
                Recibido el ${new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Email de confirmación para la futura novia
    const confirmationEmailData = {
      from: 'onboarding@resend.dev',
      reply_to: businessEmail,
      to: [email],
      subject: '🌸 ¡Solicitud recibida! - El Vals de la Novia',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4E7E4; padding: 20px; border-radius: 16px;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #1F1F1F; font-size: 24px; margin-bottom: 20px; font-family: Georgia, serif; text-align: center;">
              ✨ ¡Hola ${name}!
            </h1>

            <p style="color: #1F1F1F; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hemos recibido tu solicitud para la <strong>Asesoría Boutique</strong> y estamos emocionadas de acompañarte en la planificación de tu boda perfecta.
            </p>

            <div style="background-color: #F4E7E4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h2 style="color: #1F1F1F; font-size: 18px; margin-bottom: 15px;">¿Qué sigue ahora?</h2>

              <div style="margin-bottom: 12px;">
                <span style="color: #1F1F1F; font-weight: 500;">⏰ Próximos pasos:</span>
                <ul style="color: #1F1F1F; margin: 8px 0; padding-left: 20px;">
                  <li>Te contactaremos en <strong>menos de 24 horas</strong></li>
                  <li>Coordinaremos el día y hora de tu sesión</li>
                  <li>Te enviaremos el enlace de Zoom</li>
                  <li>¡Preparamos tu asesoría personalizada!</li>
                </ul>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1F1F1F; font-size: 16px; margin-bottom: 10px;">📋 Recordatorio de tu solicitud:</h3>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${weddingDate ? `<p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Fecha de boda:</strong> ${weddingDate}</p>` : ''}
              ${message ? `<p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Tu mensaje:</strong> "${message}"</p>` : ''}
            </div>

            <p style="color: #1F1F1F; font-size: 14px; line-height: 1.6; margin-top: 25px;">
              Mientras tanto, si tienes alguna pregunta urgente, no dudes en responder a este email.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <div style="color: #1F1F1F; font-size: 16px; font-style: italic;">
                "Transformamos tu estrés en la boda de tus sueños"
              </div>
            </div>

            <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong>El Vals de la Novia</strong><br>
                Asesoría Boutique • 60-90 min<br>
                <a href="mailto:${businessEmail}" style="color: #1F1F1F;">${businessEmail}</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar ambos emails con delay para evitar rate limiting
    console.log('🔄 Enviando emails con configuración:', {
      businessFrom: businessEmailData.from,
      businessTo: businessEmailData.to,
      confirmationFrom: confirmationEmailData.from,
      confirmationTo: confirmationEmailData.to
    });

    // Enviar primero el email de negocio
    const businessEmailResult = await resend.emails.send(businessEmailData);

    // Esperar 600ms para evitar rate limiting (máximo 2 req/segundo)
    await new Promise(resolve => setTimeout(resolve, 600));

    // Enviar email de confirmación
    const confirmationEmailResult = await resend.emails.send(confirmationEmailData);

    console.log('📧 Respuesta completa de Resend:', {
      businessEmail: businessEmailResult,
      confirmationEmail: confirmationEmailResult
    });

    // Check for errors in email sending
    const businessEmailError = businessEmailResult.error;
    const confirmationEmailError = confirmationEmailResult.error;

    if (businessEmailError || confirmationEmailError) {
      console.log('⚠️ Errores en el envío de emails:', {
        businessEmailError,
        confirmationEmailError
      });

      // Return partial success/error information
      return NextResponse.json(
        {
          message: 'Emails procesados con advertencias',
          businessEmailId: businessEmailResult.data?.id,
          confirmationEmailId: confirmationEmailResult.data?.id,
          errors: {
            businessEmail: businessEmailError,
            confirmationEmail: confirmationEmailError
          }
        },
        { status: businessEmailError && confirmationEmailError ? 400 : 200 }
      );
    }

    console.log('✅ Emails enviados exitosamente:', {
      businessEmailId: businessEmailResult.data?.id,
      confirmationEmailId: confirmationEmailResult.data?.id,
      businessEmailData: businessEmailResult.data,
      confirmationEmailData: confirmationEmailResult.data
    });

    return NextResponse.json(
      {
        message: 'Emails enviados correctamente',
        businessEmailId: businessEmailResult.data?.id,
        confirmationEmailId: confirmationEmailResult.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error detallado enviando emails:', {
      error: error,
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    });

    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}