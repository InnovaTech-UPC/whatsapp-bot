    const express = require('express');
    const bodyParser = require('body-parser');
    const { MessagingResponse } = require('twilio').twiml;

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/whatsapp', (req, res) => {
        const twiml = new MessagingResponse();
        const message = req.body.Body.toLowerCase();

        console.log("📩 Mensaje recibido:", message);

        let respuesta = "🤖 Hola, soy el asistente de tu app agrícola. Escribe 'ayuda' para ver opciones.";

        // --- 1. Uso del aplicativo
        if (message.includes("registr") || message.includes("crear cuenta")) {
            respuesta = "📝 Para registrarte como granjero, abre la app y completa tus datos básicos: nombre, zona y tipo de cultivo.";
        } else if (message.includes("contactar") && message.includes("asesor")) {
            respuesta = "👨‍🌾 Puedes contactar a un asesor desde la pestaña 'Buscar Asesor' en la app. ¿Quieres que te ayude a buscar uno?";
        } else if (message.includes("foto") || message.includes("enviar foto")) {
            respuesta = "📷 ¡Sí! Puedes enviar fotos de tu cultivo desde la sección de consultas. Así el asesor podrá ayudarte mejor.";
        } else if (message.includes("horario") && message.includes("asesor")) {
            respuesta = "🕐 Los asesores atienden de lunes a viernes, de 8am a 6pm. También puedes dejar consultas fuera de horario.";
        } else if (message.includes("programar") || message.includes("cita")) {
            respuesta = "📅 Para programar una asesoría, ingresa a la app y elige fecha y asesor disponible. ¿Te ayudo con eso?";
        } else if (message.includes("cambiar") && message.includes("contraseña")) {
            respuesta = "🔐 Ve a Configuración > Cambiar contraseña. Si olvidaste la actual, usa la opción '¿Olvidaste tu contraseña?'.";
        } else if (message.includes("actualizar") && message.includes("datos")) {
            respuesta = "🛠️ Para actualizar tus datos, abre la app y entra a tu perfil.";
        } else if (message.includes("sin internet")) {
            respuesta = "📡 Puedes escribir mensajes sin conexión, se enviarán automáticamente cuando tengas señal.";
        } else if (message.includes("me respondieron") || message.includes("respuesta")) {
            respuesta = "📨 Puedes ver respuestas en la sección de 'Mis Consultas'. También recibirás notificaciones.";
        }

        // --- 2. Beneficios del producto
        else if (message.includes("qué puedo hacer")) {
            respuesta = "🌿 En la app puedes contactar asesores, enviar fotos, recibir alertas personalizadas y mejorar tus cultivos.";
        } else if (message.includes("qué problemas") || message.includes("para qué sirve")) {
            respuesta = "💡 Te ayuda con dudas sobre cultivo, asesoría técnica, plagas, fertilización y gestión productiva.";
        } else if (message.includes("plaga") || message.includes("ayuda") && message.includes("cultivo")) {
            respuesta = "🐛 Sí, puedes consultar con un asesor sobre plagas. Envía una foto y describe el problema.";
        } else if (message.includes("costo") || message.includes("gratuito")) {
            respuesta = "💰 El servicio tiene un plan gratuito y uno premium. El gratuito permite 3 consultas al mes.";
        } else if (message.includes("tipo") && message.includes("asesoría")) {
            respuesta = "📋 Las asesorías pueden ser en cultivos, fertilización, riego, plagas o salud animal.";
        }

        // --- 3. Problemas técnicos
        else if (message.includes("no me llega") && message.includes("código")) {
            respuesta = "🔑 Asegúrate de tener buena señal. Si no te llega el código, presiona 'reenviar código' en la app.";
        } else if (message.includes("no puedo") && message.includes("iniciar sesión")) {
            respuesta = "🚫 Verifica tus datos y conexión. Si olvidaste tu clave, usa la opción 'Recuperar contraseña'.";
        } else if (message.includes("no encuentro asesor")) {
            respuesta = "👨‍🌾 Puede que estén ocupados. Intenta más tarde o deja tu consulta para que te respondan luego.";
        } else if (message.includes("error") || message.includes("no se envía")) {
            respuesta = "❗ Si ves un error, intenta cerrar y abrir la app. Si persiste, contáctanos para soporte técnico.";
        } else if (message.includes("no recibo respuesta")) {
            respuesta = "⌛ Puede tardar un poco. Si pasa más de 1 día, avísanos aquí para escalar tu caso a un asesor humano.";
        }

        // --- 4. Redirección a humanos
        else if (message.includes("hablar con persona") || message.includes("quiero ayuda") || message.includes("urgente")) {
            respuesta = "📞 Entiendo. Te conectaré con un asesor humano lo antes posible. Por favor, describe tu problema.";
        } else if (message.includes("emergencia") || message.includes("no entiendo")) {
            respuesta = "🚨 Vamos a ayudarte. Un asesor te responderá pronto. Describe brevemente tu emergencia.";
        }

        // --- 5. Simulación de funcionalidades
        else if (message.includes("opciones") || message.includes("soy granjero") || message.includes("menu")) {
            respuesta = "📌 Opciones disponibles:\n1. Contactar asesores\n2. Enviar consulta\n3. Revisar historial\n4. Recibir alertas";
        } else if (message.includes("historial") || message.includes("consultas anteriores")) {
            respuesta = "📖 Ve a 'Mis Consultas' en la app para revisar todo lo que has preguntado y las respuestas recibidas.";
        }

        twiml.message(respuesta);
        res.type('text/xml');
        res.send(twiml.toString());
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`✅ Bot de asistencia agrícola ejecutándose en http://localhost:${PORT}/whatsapp`);
    });
