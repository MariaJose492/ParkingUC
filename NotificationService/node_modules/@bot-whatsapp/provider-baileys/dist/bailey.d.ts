/// <reference types="node" />
/// <reference types="node" />
import { ProviderClass } from '@bot-whatsapp/bot';
import { Vendor } from '@bot-whatsapp/bot/dist/provider/providerClass';
import { PathOrFileDescriptor } from 'fs';
import { IStickerOptions } from 'wa-sticker-formatter';

import { BaileysEventMap, WASocket, makeInMemoryStore, proto } from './baileyWrapper';
import { BaileyHttpServer } from './server';
import { ButtonOption, GlobalVendorArgs, SendOptions } from './type';
declare class BaileysProvider extends ProviderClass {
    http: BaileyHttpServer | undefined;
    globalVendorArgs: GlobalVendorArgs;
    vendor: Vendor<WASocket>;
    store?: ReturnType<typeof makeInMemoryStore>;
    saveCredsGlobal: (() => Promise<void>) | null;
    constructor(args: Partial<GlobalVendorArgs>);
    /**
     * Iniciar todo Bailey
     */
    protected initBailey: () => Promise<void>;
    /**
     *
     * @param port
     */
    initHttpServer(port: number): void;
    /**
     * Mapeamos los eventos nativos a los que la clase Provider espera
     * para tener un standar de eventos
     * @returns
     */
    protected busEvents: () => {
        event: keyof BaileysEventMap;
        func: (arg?: any, arg2?: any) => any;
    }[];
    protected initBusEvents: (_sock: WASocket) => void;
    protected getMessage: (key: {
        remoteJid: string;
        id: string;
    }) => Promise<proto.IMessage>;
    /**
     * @alpha
     * @param {string} number
     * @param {string} message
     * @example await sendMessage('+XXXXXXXXXXX', 'https://dominio.com/imagen.jpg' | 'img/imagen.jpg')
     */
    sendMedia: (number: string, imageUrl: string, text: string) => Promise<proto.WebMessageInfo>;
    /**
     * Enviar imagen
     * @param {*} number
     * @param {*} imageUrl
     * @param {*} text
     * @returns
     */
    sendImage: (number: string, filePath: PathOrFileDescriptor, text: any) => Promise<proto.WebMessageInfo>;
    /**
     * Enviar video
     * @param {*} number
     * @param {*} imageUrl
     * @param {*} text
     * @returns
     */
    sendVideo: (number: string, filePath: PathOrFileDescriptor, text: any) => Promise<proto.WebMessageInfo>;
    /**
     * Enviar audio
     * @alpha
     * @param {string} number
     * @param {string} message
     * @param {boolean} voiceNote optional
     * @example await sendMessage('+XXXXXXXXXXX', 'audio.mp3')
     */
    sendAudio: (number: string, audioUrl: string) => Promise<proto.WebMessageInfo>;
    /**
     *
     * @param {string} number
     * @param {string} message
     * @returns
     */
    sendText: (number: string, message: string) => Promise<proto.WebMessageInfo>;
    /**
     *
     * @param {string} number
     * @param {string} filePath
     * @example await sendMessage('+XXXXXXXXXXX', './document/file.pdf')
     */
    sendFile: (number: string, filePath: string) => Promise<proto.WebMessageInfo>;
    /**
     *
     * @param {string} number
     * @param {string} text
     * @param {string} footer
     * @param {Array} buttons
     * @example await sendMessage("+XXXXXXXXXXX", "Your Text", "Your Footer", [{"buttonId": "id", "buttonText": {"displayText": "Button"}, "type": 1}])
     */
    sendButtons: (number: string, text: string, buttons: ButtonOption[]) => Promise<proto.WebMessageInfo>;
    /**
     *
     * @param {string} number
     * @param {string} text
     * @param {string} footer
     * @param {Array} poll
     * @example await sendMessage("+XXXXXXXXXXX", { poll: { "name": "You accept terms", "values": [ "Yes", "Not"], "selectableCount": 1 })
     */
    sendPoll: (numberIn: string, text: string, poll: {
        options: string[];
        multiselect: any;
    }) => Promise<false | proto.WebMessageInfo>;
    /**
     * TODO: Necesita terminar de implementar el sendMedia y sendButton guiarse:
     * https://github.com/leifermendez/bot-whatsapp/blob/4e0fcbd8347f8a430adb43351b5415098a5d10df/packages/provider/src/web-whatsapp/index.js#L165
     * @param {string} number
     * @param {string} message
     * @example await sendMessage('+XXXXXXXXXXX', 'Hello World')
     */
    sendMessage: (numberIn: string | number, message: string, options: SendOptions) => Promise<any>;
    /**
     * @param {string} remoteJid
     * @param {string} latitude
     * @param {string} longitude
     * @param {any} messages
     * @example await sendLocation("xxxxxxxxxxx@c.us" || "xxxxxxxxxxxxxxxxxx@g.us", "xx.xxxx", "xx.xxxx", messages)
     */
    sendLocation: (remoteJid: string, latitude: any, longitude: any, messages?: any) => Promise<{
        status: string;
    }>;
    /**
     * @param {string} remoteJid
     * @param {string} contactNumber
     * @param {string} displayName
     * @param {any} messages - optional
     * @example await sendContact("xxxxxxxxxxx@c.us" || "xxxxxxxxxxxxxxxxxx@g.us", "+xxxxxxxxxxx", "Robin Smith", messages)
     */
    sendContact: (remoteJid: any, contactNumber: {
        replaceAll: (arg0: string, arg1: string) => any;
    }, displayName: any, messages?: any) => Promise<{
        status: string;
    }>;
    /**
     * @param {string} remoteJid
     * @param {string} WAPresence
     * @example await sendPresenceUpdate("xxxxxxxxxxx@c.us" || "xxxxxxxxxxxxxxxxxx@g.us", "recording")
     */
    sendPresenceUpdate: (remoteJid: any, WAPresence: any) => Promise<void>;
    /**
     * @param {string} remoteJid
     * @param {string} url
     * @param {object} stickerOptions
     * @param {any} messages - optional
     * @example await sendSticker("xxxxxxxxxxx@c.us" || "xxxxxxxxxxxxxxxxxx@g.us", "https://dn/image.png" || "https://dn/image.gif" || "https://dn/image.mp4", {pack: 'User', author: 'Me'} messages)
     */
    sendSticker: (remoteJid: any, url: string | Buffer, stickerOptions: Partial<IStickerOptions>, messages?: any) => Promise<void>;
}
export { BaileysProvider, GlobalVendorArgs as BaileysProviderArgs };
//# sourceMappingURL=bailey.d.ts.map