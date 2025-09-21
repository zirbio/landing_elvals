// Test script para verificar la configuración de email
// Ejecutar con: node test-email.js

require('dotenv').config({ path: '.env.local' });

const testConfig = () => {
  console.log('🧪 Verificando configuración de email...\n');

  // Check environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const businessEmail = process.env.BUSINESS_EMAIL;

  if (!apiKey) {
    console.log('❌ RESEND_API_KEY no encontrado en .env.local');
    console.log('   Asegúrate de crear el archivo .env.local con tu API key\n');
    return false;
  }

  if (!businessEmail) {
    console.log('❌ BUSINESS_EMAIL no encontrado en .env.local');
    console.log('   Añade tu email de negocio al archivo .env.local\n');
    return false;
  }

  // Check API key format
  if (!apiKey.startsWith('re_')) {
    console.log('❌ RESEND_API_KEY parece inválido');
    console.log('   Debe empezar con "re_"\n');
    return false;
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(businessEmail)) {
    console.log('❌ BUSINESS_EMAIL tiene formato inválido');
    console.log('   Debe ser un email válido como: tu@dominio.com\n');
    return false;
  }

  console.log('✅ RESEND_API_KEY configurado correctamente');
  console.log('✅ BUSINESS_EMAIL configurado correctamente');
  console.log(`📧 Emails se enviarán a: ${businessEmail}`);
  console.log('\n🎯 Configuración completada. ¡Prueba el formulario en la web!');
  console.log('   http://localhost:3000\n');

  return true;
};

const sendTestEmail = async () => {
  try {
    console.log('📤 Enviando email de prueba...\n');

    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Prueba Sistema',
        email: process.env.BUSINESS_EMAIL,
        weddingDate: 'Verano 2025',
        message: 'Este es un email de prueba del sistema de reservas.'
      }),
    });

    if (response.ok) {
      console.log('✅ Email de prueba enviado correctamente!');
      console.log('   Revisa tu bandeja de entrada');
    } else {
      console.log('❌ Error enviando email de prueba');
      const error = await response.text();
      console.log('   Error:', error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    console.log('   Asegúrate de que el servidor esté corriendo (npm run dev)');
  }
};

// Ejecutar tests
const configOk = testConfig();

if (configOk && process.argv.includes('--send-test')) {
  sendTestEmail();
}

if (process.argv.includes('--help')) {
  console.log(`
📧 Script de Verificación de Email

Uso:
  node test-email.js                 # Verificar configuración
  node test-email.js --send-test     # Enviar email de prueba
  node test-email.js --help          # Mostrar esta ayuda

Antes de usar:
  1. Asegúrate de tener .env.local configurado
  2. Para --send-test, inicia el servidor: npm run dev
`);
}