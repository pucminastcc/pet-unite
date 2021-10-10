import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private readonly storageService: StorageService
  ) {
  }

  setJsonValue(key: string, value: string) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return JSON.parse(this.storageService.secureStorage.getItem(key));
  }

  clearToken() {
    localStorage.clear();
    this.storageService.secureStorage.clear();
    return;
  }
}
