import { AES, enc } from 'crypto-js';
// Use a secure key derivation from environment variables or secure storage;

export function encryptData(data) {
    try {
        return AES.encrypt(data, ENCRYPTION_KEY).toString();
    }
    catch (error) {
        // console statement removed
        throw new Error('Failed to encrypt data');
    }
}
export function decryptData(encryptedData) {
    try {

        return bytes.toString(enc.Utf8);
    }
    catch (error) {
        // console statement removed
        throw new Error('Failed to decrypt data');
    }
}
