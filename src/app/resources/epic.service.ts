import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { PersonResponse } from './project-memberships.service';

import { PtElement, BaseResource } from './';

export interface LabelResponse extends PtElement {
  kind: 'label';
  name: string;
}

export interface EpicResponse extends PtElement {
  kind: 'epic';
  name: string;
  description: string;
  label: LabelResponse;
  url: string;
  followers: PersonResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class EpicService extends BaseResource<EpicResponse[]> {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string): Observable<EpicResponse[]> {
    const params = {
      fields: [':default', 'followers'].join(','),
    };

    const req = this.pivotalAPI
      .get<EpicResponse[]>(`/projects/${projectId}/epics`, {
        params,
      })
      .pipe(map(r => r.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
