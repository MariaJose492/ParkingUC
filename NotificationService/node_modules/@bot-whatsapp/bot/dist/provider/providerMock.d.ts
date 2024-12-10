import { ProviderClass } from './providerClass';
type EventName = string;
type PayloadType = any;
declare class ProviderMock extends ProviderClass {
    delaySendMessage: (milliseconds: number, eventName: EventName, payload: PayloadType) => Promise<void>;
    sendMessage: (userId: string, message: string) => Promise<any>;
}
export { ProviderMock };
//# sourceMappingURL=providerMock.d.ts.map