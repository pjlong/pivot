import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PivotalAPIService } from '../pivotal-api.service';
import { PtElement } from './';

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
  providedIn: 'root'
})
export class EpicService {
  private data$ = new BehaviorSubject<EpicResponse[]>(null);

  readonly model$ = this.data$.asObservable().pipe(filter(x => x !== null));

  constructor(private pivotalAPI: PivotalAPIService) { }

  get(projectId: string) {
    const req = this.pivotalAPI.get(`/projects/${projectId}/epics`)
      .pipe(map(r => r.body));
    req.subscribe({
      next: response => {
        this.data$.next(response as EpicResponse[]);
      }
    });
    return req;
  }
}
