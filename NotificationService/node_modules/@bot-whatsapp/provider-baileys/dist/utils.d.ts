/**
 * Cleans the WhatsApp number format.
 * @param number The WhatsApp number to be cleaned.
 * @param full Whether to return the full number format or not.
 * @returns The cleaned number.
 */
declare const baileyCleanNumber: (number: string, full?: boolean) => string;
/**
 * Generates an image from a base64 string.
 * @param base64 The base64 string to generate the image from.
 * @param name The name of the file to write the image to.
 */
declare const baileyGenerateImage: (base64: string, name?: string) => Promise<void>;
/**
 * Validates if the given number is a valid WhatsApp number and not a group ID.
 * @param rawNumber The number to validate.
 * @returns True if it's a valid number, false otherwise.
 */
declare const baileyIsValidNumber: (rawNumber: string) => boolean;
export { baileyCleanNumber, baileyGenerateImage, baileyIsValidNumber };
//# sourceMappingURL=utils.d.ts.map