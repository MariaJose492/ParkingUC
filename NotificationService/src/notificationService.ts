import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";


const flowBienvenida = addKeyword('hola').addAnswer('Hola, bienvenido a Parking UC 🚗🅿️. ¿En qué puedo ayudarte?');

const main = async () => {

    const provider = createProvider(BaileysProvider);
    provider.initHttpServer(3002);  

    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body;
        const phone = body.phone;
        const message = body.message;

        await bot.sendMessage(phone, message,{});

        res.end('Esto es una respuesta');
    }));

    
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    });
};

main();
