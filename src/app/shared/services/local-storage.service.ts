import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  constructor(private _storage: LocalStorageService) { }

  async set(key: string, value: any): Promise<any> {
    return await this._storage.set(key, value);
  }

  setSync(key: string, value: any) {
    return  this._storage.set(key, value);
  }

  async setObject(key: string, object: object) {
    return await this._storage.set(key, JSON.stringify(object));
  }

  setObjectSync(key: string, object: object) {
    return  this._storage.set(key, JSON.stringify(object));
  }

  async get(key: string): Promise<any> {
    return await this._storage.get(key);
  }

  getSync(key: string): any{
    return  this._storage.get(key);
  }

  async getObject(key: string): Promise<any> {
    return await JSON.parse(this._storage.get(key));
  }

  getObjectSync(key: string): any {
    return JSON.parse(this._storage.get(key));
  }

  async remove(key: string) {
    await this._storage.remove(key);
  }

  async clear() {
    await this._storage.clear();
  }

}
