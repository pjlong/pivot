import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectMembershipResponse } from './project-memberships.service';

import { BaseResource, BaseElement } from '.';

interface MeResponse extends BaseElement {
  kind: 'me';
  name: string;
  initials: string;
  projects: ProjectMembershipResponse[];
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeService extends BaseResource {
  get(): Observable<MeResponse> {
    const req = this.pivotalAPI
      .get('/me')
      .pipe(map(response => response.body)) as Observable<MeResponse>;

    req.subscribe({
      next: me => {
        this.data$.next(me);
      },
    });

    return req;
  }
}
