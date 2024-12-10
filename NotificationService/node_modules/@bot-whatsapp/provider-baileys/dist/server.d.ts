/// <reference types="node" />
import { WASocket } from '@whiskeysockets/baileys';
import { EventEmitter } from 'node:events';
import { type Polka } from 'polka';

import { BaileysProvider } from './bailey';
import { BotCtxMiddleware } from './type';
declare class BaileyHttpServer extends EventEmitter {
    server: Polka;
    port: number;
    constructor(_port: number);
    /**
     *
     * @param _
     * @param res
     */
    protected indexHome: (_: any, res: any) => void;
    /**
     * Contruir HTTP Server
     */
    protected buildHTTPServer(): Polka;
    /**
     * Iniciar el servidor HTTP
     */
    start(vendor: BotCtxMiddleware, port?: number): void;
    stop(): Promise<void>;
}
/**
 *
 * @param ctxPolka
 * @returns
 */
declare const handleCtx: <T extends Pick<BaileysProvider, "sendMessage"> & {
    provider: WASocket;
}>(ctxPolka: (bot: T, req: any, res: any) => void) => (req: any, res: any) => void;
export { BaileyHttpServer, handleCtx };
//# sourceMappingURL=server.d.ts.map