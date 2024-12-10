import { CoreClass } from './core/coreClass';
import { MemoryDBClass } from './db';
import { LIST_ALL as EVENTS } from './io/events';
import FlowClass from './io/flowClass';
import { addAnswer } from './io/methods/addAnswer';
import { addKeyword } from './io/methods/addKeyword';
import { ProviderClass } from './provider/providerClass';
import { TFlow } from './types';
import * as utils from './utils';
export interface GeneralArgs {
    blackList?: any[];
    listEvents?: Record<string, any>;
    delay?: number;
    globalState?: Record<string, any>;
    extensions?: any[];
    queue?: {
        timeout: number;
        concurrencyLimit: number;
    };
}
export interface BotCreationArgs {
    flow: FlowClass;
    database: MemoryDBClass;
    provider: ProviderClass;
}
/**
 * Crear instancia de clase Bot
 */
declare const createBot: ({ flow, database, provider }: BotCreationArgs, args?: GeneralArgs) => Promise<CoreClass>;
/**
 * Crear instancia de clase Io (Flow)
 */
declare const createFlow: (args: TFlow[]) => FlowClass;
/**
 * Crear instancia de clase Provider
 * Depdendiendo del Provider puedes pasar argumentos
 * Ver Documentacion
 */
declare const createProvider: <T = ProviderClass, K = any>(providerClass: new (args: K) => T, args?: K) => T;
export { createBot, createFlow, createProvider, addKeyword, addAnswer, ProviderClass, CoreClass, EVENTS, MemoryDBClass as MemoryDB, utils, };
//# sourceMappingURL=index.d.ts.map