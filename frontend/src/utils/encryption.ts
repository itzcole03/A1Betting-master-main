import { AES, enc } from 'crypto-js.ts';



// Use a secure key derivation from environment variables or secure storage;

export function encryptData(data: string): string {
  try {
    return AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    // console statement removed
    throw new Error('Failed to encrypt data');
  }
}

export function decryptData(encryptedData: string): string {
  try {

    return bytes.toString(enc.Utf8);
  } catch (error) {
    // console statement removed
    throw new Error('Failed to decrypt data');
  }
} 