const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
    const twiml = new MessagingResponse();
    const message = req.body.Body.toLowerCase().trim();

    console.log("📩 Mensaje recibido:", message);

    let respuesta = "🤖 Hola, soy el asistente de tu app agrícola. Escribe *'ayuda'* para ver el menú de opciones.";

    // --- AYUDA / MENÚ PRINCIPAL
    if (message === "ayuda" || message === "menu" || message === "opciones") {
        respuesta = `🧑‍🌾 Menú de opciones:
1️⃣ ¿Cómo me registro?
2️⃣ Contactar a un asesor
3️⃣ Enviar fotos de cultivo
4️⃣ Ver horarios de asesores
5️⃣ Programar asesoría
6️⃣ Cambiar contraseña
7️⃣ Actualizar mis datos
8️⃣ ¿Funciona sin internet?
9️⃣ Ver respuestas
🔟 Beneficios de la app
11️⃣ Problemas comunes
12️⃣ Hablar con una persona`;
    }

    // --- OPCIONES NUMÉRICAS
    else if (message === "1") {
        respuesta = "📝 Para registrarte como granjero, abre la app y completa tus datos: nombre, zona y tipo de cultivo.";
    } else if (message === "2") {
        respuesta = "👨‍🌾 Puedes contactar a un asesor desde la pestaña 'Buscar Asesor' en la app. ¿Te ayudo a encontrar uno?";
    } else if (message === "3") {
        respuesta = "📷 ¡Sí! Puedes enviar fotos desde la sección de consultas para que el asesor te ayude mejor.";
    } else if (message === "4") {
        respuesta = "🕐 Los asesores están disponibles de lunes a viernes, de 8am a 6pm.";
    } else if (message === "5") {
        respuesta = "📅 Para programar una asesoría, abre la app y elige fecha + asesor disponible.";
    } else if (message === "6") {
        respuesta = "🔐 Ve a Configuración > Cambiar contraseña en la app.";
    } else if (message === "7") {
        respuesta = "🛠️ Para actualizar tus datos, abre la app y entra a tu perfil.";
    } else if (message === "8") {
        respuesta = "📡 Puedes escribir mensajes sin internet. Se enviarán cuando recuperes señal.";
    } else if (message === "9") {
        respuesta = "📨 Revisa las respuestas en 'Mis Consultas' o en tus notificaciones.";
    } else if (message === "10" || message.includes("beneficios")) {
        respuesta = "🌱 Beneficios:\n- Contacto directo con asesores\n- Gestión de cultivos\n- Ayuda técnica\n- Alertas personalizadas";
    } else if (message === "11" || message.includes("problema")) {
        respuesta = "⚠️ Problemas frecuentes:\n- Código no llega: revisa tu señal\n- No hay asesores: intenta más tarde\n- Error en app: reinicia";
    } else if (message === "12" || message.includes("humano") || message.includes("persona")) {
        respuesta = "📞 Te conecto con un asesor humano. Por favor, escribe tu problema.";
    }

    twiml.message(respuesta);
    res.type('text/xml');
    res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Bot agrícola ejecutándose en http://localhost:${PORT}/whatsapp`);
});
