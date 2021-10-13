import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

// @ts-ignore
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = '^732yTq%jHGHTsB*+nce4dQf+#Dk6yT6=^y?dJ3&s5rx567';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public secureStorage = new SecureStorage(localStorage, {
    hash: (key: any) => {
      // @ts-ignore
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    encrypt: (data: any) => {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: (data: any) => {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });
}
