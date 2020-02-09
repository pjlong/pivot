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

  set(key: string, value: any): void {
    localStorage.setItem(`${this.prefix}${key}`, value);
  }

  add(key: string, value: string): void {
    const item: string = localStorage.getItem(`${this.prefix}${key}`);

    if (item) {
      const list: string[] = item.split(',');
      list.push(value);
      localStorage.setItem(`${this.prefix}${key}`, list.toString());
    } else {
      localStorage.setItem(`${this.prefix}${key}`, value);
    }
  }

  remove(key: string, value: string): void {
    const item: string = localStorage.getItem(`${this.prefix}${key}`);

    if (item) {
      const list: string[] = item.split(',');

      const index = list.indexOf(value);
      if (index > -1) {
        list.splice(index, 1);
      }
      localStorage.setItem(`${this.prefix}${key}`, list.toString());
    }
  }
}
