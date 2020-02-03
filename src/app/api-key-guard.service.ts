import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(): boolean {
    const apiKey = this.localStorageService.get('api_key');
    if (!apiKey) {
      this.router.navigate(['auth']);
    }

    return !!apiKey;
  }
}
