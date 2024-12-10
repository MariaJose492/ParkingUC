type Logger = Console;
declare class Queue<T> {
    private queue;
    private queueTime;
    private timers;
    private idsCallbacks;
    private workingOnPromise;
    private logger;
    private timeout;
    private concurrencyLimit;
    constructor(logger: Logger, concurrencyLimit?: number, timeout?: number);
    /**
     * Limpiar colar de proceso
     * @param from
     * @param item
     */
    clearAndDone(from: string, item: {
        fingerIdRef: string;
    }): void;
    private processItem;
    enqueue(from: string, promiseInFunc: () => Promise<T>, fingerIdRef: string): Promise<T>;
    processQueue(from: string): Promise<void>;
    clearQueue(from: string): Promise<number>;
    setFingerTime(from: string, fingerTime: number): void;
    setIdsCallbacks(from: string, ids?: string[]): void;
    getIdsCallback(from: string): string[];
    clearIdFromCallback(from: string, id: string): void;
}
export { Queue };
//# sourceMappingURL=queueClass.d.ts.map