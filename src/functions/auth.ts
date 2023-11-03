/* eslint-disable no-use-before-define */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { deleteCookie, getCookie } from "some-javascript-utils/browser";

import { decrypt, encrypt } from "./crypto";

/**
 *
 * @param storageKey where is located the key of the encryption
 * @returns the logged user from local storage
 */
export const fromLocal = (storageKey: string) => {
  const data = JSON.parse(decrypt(localStorage.getItem(storageKey) ?? "key"));
  return data;
};

/**
 *
 * @param storageKey where is located the key of the encryption
 * @returns the user permissions from local storage
 */
export const getUserPermissions = (storageKey: string) => {
  const data = JSON.parse(decrypt(localStorage.getItem(storageKey) ?? "key"));
  return data.permissions;
};

/**
 *
 * @param storageKey where is located the key of the encryption
 * @returns the user photo from local storage
 */
export const getUserPhoto = (storageKey: string) => {
  try {
    const data = JSON.parse(decrypt(localStorage.getItem(storageKey) ?? "key"));
    return data.photo;
  } catch (err) {
    console.error(err);
  }
  return undefined;
};

/**
 *
 * @param storageKey where is located the key of the encryption
 * @returns the user name from local storage
 */
export const getUserName = (storageKey: string) => {
  const data = JSON.parse(decrypt(localStorage.getItem(storageKey) ?? "key"));
  return data.user;
};

/**
 *
 * @param storageKey where is located the key of the encryption
 * @returns the user id from local storage
 */
export const getUserId = (storageKey: string) => {
  const data = JSON.parse(decrypt(localStorage.getItem(storageKey) ?? "key"));
  return data.id;
};

/**
 *
 * @param cookieKey
 * @returns true if user logged
 */
export const userLogged = (cookieKey: string) =>
  getCookie(cookieKey).length > 0;

/**
 *
 * @param userKey storage key of the user
 * @param jwtCookie cookie key of the jwt
 *
 */
export function logoutUser(userKey: string, jwtCookie: string) {
  localStorage.removeItem(userKey);
  deleteCookie(jwtCookie);
}

/**
 *
 * @param data user object
 * @param storageKey to save the user

 */
export function logUser(data: object, storageKey: string) {
  localStorage.setItem(storageKey, encrypt(data));
}
