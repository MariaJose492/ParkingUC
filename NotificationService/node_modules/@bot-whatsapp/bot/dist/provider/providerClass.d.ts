/// <reference types="node" />
import { EventEmitter } from 'node:events';
export type Vendor<T = {}> = {} & T;
declare class ProviderClass extends EventEmitter {
    vendor: Vendor;
    globalVendorArgs: any;
    sendMessage<K = any>(userId: string, message: any, args?: any): Promise<K>;
    getInstance(): Vendor;
}
export { ProviderClass };
//# sourceMappingURL=providerClass.d.ts.map