import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PtElement, BaseResource } from './';

export interface LabelResponse extends PtElement {
  kind: 'label';
  name: string;
}

export interface EpicResponse extends PtElement {
  kind: 'epic';
  name: string;
  label: LabelResponse[];
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class EpicService extends BaseResource<EpicResponse[]> {
  get(projectId: string): Observable<EpicResponse[]> {
    const req = this.pivotalAPI
      .get(`/projects/${projectId}/epics`)
      .pipe(map(r => r.body)) as Observable<EpicResponse[]>;

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
