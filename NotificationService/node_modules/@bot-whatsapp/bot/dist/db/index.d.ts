interface Context {
    from: string;
    keyword: string;
    answer: string;
}
declare class MemoryDBClass {
    listHistory: Context[];
    constructor();
    getPrevByNumber(from: string): Context | undefined;
    save(ctx: Context): void;
}
export { MemoryDBClass };
//# sourceMappingURL=index.d.ts.map