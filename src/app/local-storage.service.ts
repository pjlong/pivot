import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private keyPrefix: string;

  static withPrefix(prefix = ''): LocalStorageService {
    const instance: LocalStorageService = new LocalStorageService();
    instance.keyPrefix = prefix;
    return instance;
  }

  private get prefix(): string {
    return this.keyPrefix ? `${this.keyPrefix}:` : '';
  }

  get(key: string): string {
    return localStorage.getItem(`${this.prefix}${key}`);
  }

  set(key: string, value: string): void {
    localStorage.setItem(`${this.prefix}${key}`, value);
  }
}
