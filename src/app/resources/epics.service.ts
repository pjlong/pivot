import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { EpicResponse } from './epic.service';

import { BaseResource } from '.';

@Injectable({
  providedIn: 'root',
})
export class EpicsService extends BaseResource<EpicResponse[]> {
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
