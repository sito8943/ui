import CryptoJS from "crypto-js";

/**
 *
 * @param data anything to encrypt
 * @param key key for encryption
 * @returns encrypted data
 */
export function encrypt(data: unknown, key = "key") {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

/**
 *
 * @param data string to decrypt
 * @param key key for encryption
 * @returns decrypted data
 */
export function decrypt(data: string, key = "key") {
  return JSON.parse(
    CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
  );
}
