import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class PivotalAPIService {
  PIVOTAL_API_ROOT = 'https://pivotaltracker.com/services/v5';

  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-TrackerToken': environment.pivotalAPIToken
    });
  }

  get(path: string, params: any = {}) {
    return this.http.get(`${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.headers,
        params
      }
    );
  }

  post(path: string, params: any) {
    return this.http.post(`${environment.host}/${this.PIVOTAL_API_ROOT}${path}`,
      {
        headers: this.headers,
        params
      }
    );
  }
}
