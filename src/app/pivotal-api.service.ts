import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env';

import { LocalStorageService } from './local-storage.service';

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

  get<T = {}>(path: string, options?: any): Observable<HttpResponse<T>> {
    const params = options ? options.params : {};
    const headers = options ? options.headers : {};

    return this.http.get<T>(
      `${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.buildHeaders(headers),
        params,
        observe: 'response',
      }
    );
  }

  post<T = {}>(path: string, params: any): Observable<T> {
    return this.http.post<T>(
      `${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.buildHeaders(),
        params,
      }
    );
  }

  private buildHeaders(headers = {}): HttpHeaders {
    return new HttpHeaders({
      ...headers,
      ...this.DEFAULT_HEADERS,
      'X-TrackerToken': this.localStorageService.get('api_key') || null,
    });
  }
}
