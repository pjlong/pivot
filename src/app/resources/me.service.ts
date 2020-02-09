import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { BaseResource, BaseElement } from '.';

export interface MeResponse extends BaseElement {
  kind: 'me';
  name: string;
  initials: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeService extends BaseResource {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(): Observable<MeResponse> {
    const req = this.pivotalAPI
      .get<MeResponse>('/me')
      .pipe(map(response => response.body));

    req.subscribe({
      next: me => {
        this.data$.next(me);
      },
    });

    return req;
  }
}
