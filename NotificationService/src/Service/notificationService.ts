import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";


const flowBienvenida = addKeyword('hola').addAnswer('Hola, bienvenido');

const main = async () => {

    const provider = createProvider(BaileysProvider);
    provider.initHttpServer(3002);  

    
    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        // Extraer parámetros del cuerpo de la solicitud
        const { phoneNumber, message } = req.body;

        // Validar que los parámetros estén presentes
        if (!phoneNumber || !message) {
            return res.status(400).send('Faltan parámetros: phoneNumber y message');
        }

        // Enviar el mensaje al número proporcionado
        try {
            // Asegúrate de que phoneNumber tenga el prefijo internacional correcto (ejemplo: '573163566911')
            console.log(`Enviando mensaje a: ${phoneNumber} con mensaje: ${message}`);

            await bot.sendMessage(phoneNumber, message, {})
            return res.send('Mensaje enviado');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error); // Imprime el error completo para depuración
            return res.status(400).send(`Error al enviar el mensaje: ${error}`);
        }
    }));

    // Crear el bot con el flujo y la base de datos
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    });
};

main();
