import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _prefix: string;

  static withPrefix(prefix: string = '') {
    const instance: LocalStorageService = new LocalStorageService();
    instance._prefix = prefix;
    return instance;
  }

  private get prefix() {
    return !!this._prefix ? `${this._prefix}:` : '';
  }

  get(key: string): string {
    return localStorage.getItem(`${this.prefix}${key}`);
  }

  set(key: string, value: string): void {
    localStorage.setItem(`${this.prefix}${key}`, value);
  }
}
