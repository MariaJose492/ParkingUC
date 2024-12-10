declare class BlackList {
    blacklist: Set<string>;
    constructor(initialNumbers?: string[]);
    add(phoneNumbers: string | string[]): string[];
    remove(phoneNumber: string): void;
    checkIf(phoneNumber: string): boolean;
    getList(): string[];
}
export { BlackList };
//# sourceMappingURL=blacklistClass.d.ts.map