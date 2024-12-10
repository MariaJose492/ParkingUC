/// <reference types="node" />
import { EventEmitter } from 'node:events';
import { GlobalState, SingleState } from '../context';
import FlowClass from '../io/flowClass';
import { BlackList, Queue } from '../utils';
import { delay } from '../utils/delay';
export interface CoreClassArgs {
    blackList: string[];
    listEvents: Record<string, any>;
    delay: number;
    globalState: Record<string, any>;
    extensions: Record<string, any>;
    queue: {
        timeout: number;
        concurrencyLimit: number;
    };
}
type EventFunction = (msg: {
    [key: string]: string;
}) => Promise<any> | void;
declare class CoreClass extends EventEmitter {
    flowClass: FlowClass;
    databaseClass: any;
    providerClass: any;
    queuePrincipal: Queue<unknown>;
    stateHandler: SingleState;
    globalStateHandler: GlobalState;
    dynamicBlacklist: BlackList;
    generalArgs: CoreClassArgs;
    constructor(_flow: any, _database: any, _provider: any, _args: CoreClassArgs);
    /**
     * Manejador de eventos
     */
    listenerBusEvents: () => {
        event: string;
        func: EventFunction;
    }[];
    handleMsg: (messageCtxInComming: {
        from: string;
        ref?: string;
        body?: string;
    }) => Promise<{
        createCtxMessage: (payload: {
            body: any;
            answer: any;
            media: null;
            buttons: any[];
            capture: boolean;
            delay: number;
            keyword: null;
        }, index?: number) => import("../types").TContext;
        clearQueue: () => void;
        endFlow: (flag: {
            endFlow: any;
            fallBack?: boolean;
            flowDynamic?: boolean;
            gotoFlow?: boolean;
        }) => (message?: any) => Promise<void>;
        sendFlow: (messageToSend: any[], numberOrId: string, options?: {
            [key: string]: any;
        }) => Promise<void>;
        continueFlow: (initRef?: any) => Promise<any>;
        fallBack: (flag: {
            endFlow?: boolean;
            fallBack: any;
            flowDynamic?: boolean;
            gotoFlow?: boolean;
        }) => (message?: any) => Promise<void>;
        gotoFlow: (flag: {
            endFlow?: boolean;
            fallBack?: boolean;
            flowDynamic?: boolean;
            gotoFlow?: any;
        }) => (flowInstance: {
            toJson: () => any;
            ctx: {
                options: {
                    delay: any;
                };
            };
        }, step?: number) => Promise<void>;
        flowDynamic: (flag: {
            endFlow?: boolean;
            fallBack?: boolean;
            flowDynamic: any;
            gotoFlow?: boolean;
        }, inRef: any, privateOptions: {
            [x: string]: any;
            omitEndFlow?: any;
            idleCtx?: any;
        }) => (listMsg?: any[], options?: {
            continue: boolean;
        }) => Promise<void>;
        resolveCbEveryCtx: (ctxMessage: any, options?: {
            omitEndFlow: boolean;
            idleCtx: boolean;
            triggerKey: boolean;
        }) => Promise<void | {
            endFlow: boolean;
            fallBack: boolean;
            flowDynamic: boolean;
            gotoFlow: boolean;
        }>;
        cbEveryCtx: (inRef: string | number, options?: {
            [key: string]: any;
        }) => Promise<void | {
            endFlow: boolean;
            fallBack: boolean;
            flowDynamic: boolean;
            gotoFlow: boolean;
        }>;
    }>;
    /**
     * Enviar mensaje con contexto atraves del proveedor de whatsapp
     * @param {*} numberOrId
     * @param {*} ctxMessage ver más en GLOSSARY.md
     * @returns
     */
    sendProviderAndSave: (numberOrId: string, ctxMessage: any) => Promise<void>;
    /**
     * @private
     * @param {*} message
     * @param {*} ref
     */
    continue: (message: null, ref?: boolean) => void;
    /**
     * Funcion dedicada a enviar el mensaje sin pasar por el flow
     * (dialogflow)
     * @param {*} messageToSend
     * @param {*} numberOrId
     * @returns
     */
    sendFlowSimple: (messageToSend: any, numberOrId: any) => Promise<{
        (): Promise<void>;
        <T>(value: T): Promise<Awaited<T>>;
        <T_1>(value: T_1 | PromiseLike<T_1>): Promise<Awaited<T_1>>;
    }>;
}
export { CoreClass };
//# sourceMappingURL=coreClass.d.ts.map