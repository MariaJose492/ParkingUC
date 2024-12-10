interface FormatOptions {
    code: string;
    ext: string;
}
declare const formats: Record<string, FormatOptions>;
declare const convertAudio: (filePath: string, format?: keyof typeof formats) => Promise<string>;
export { convertAudio };
//# sourceMappingURL=convertAudio.d.ts.map