import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class PivotalAPIService {
  PIVOTAL_API_ROOT = 'https://pivotaltracker.com/services/v5';
  DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  get(path: string, options?: any) {
    const params = options ? options.params : {};
    const headers = options ? options.headers : {};

    return this.http.get(
      `${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.buildHeaders(headers),
        params,
        observe: 'response',
      }
    );
  }

  post(path: string, params: any) {
    return this.http.post(
      `${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.buildHeaders(),
        params,
      }
    );
  }

  private buildHeaders(headers = {}) {
    return new HttpHeaders({
      ...headers,
      ...this.DEFAULT_HEADERS,
      'X-TrackerToken': this.localStorageService.get('api_key') || null,
    });
  }
}
