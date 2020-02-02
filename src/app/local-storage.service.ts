import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private prefix: string = '') {}

  get(key: string): string {
    return localStorage.getItem(`${this.prefix}:${key}`);
  }

  set(key: string, value: string): void {
    localStorage.setItem(`${this.prefix}:${key}`, value);
  }
}
