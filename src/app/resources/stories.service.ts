import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, concat, defer, EMPTY, from, merge, Observable } from 'rxjs';
import { combineAll, combineLatest, concatAll, expand, filter, map, mergeMap, tap, toArray } from 'rxjs/operators';

import { PtElement } from '.';
import { PivotalAPIService } from '../pivotal-api.service';
import { LabelResponse } from './epic.service';
import { PersonResponse } from './project-memberships.service';

export interface StoryResponse extends PtElement {
  kind: 'story';
  story_type: 'bug' | 'feature' | 'chore';
  name: string;
  description: string;
  current_state: string;
  requested_by_id: number;
  url: string;
  owner_ids: number[];
  labels: LabelResponse;

  // Non API properties
  owners: PersonResponse[];
  requester: PersonResponse;
}


@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private data$ = new BehaviorSubject<StoryResponse[]>(null);

  readonly model$ = this.data$.asObservable().pipe(filter(x => x !== null));

  private index = 0;

  constructor(private pivotalAPI: PivotalAPIService) { }

  get(projectId: string, options: any = {}) {
    const { limit = 100 } = options;
    const req = this.pivotalAPI.get(`/projects/${projectId}/stories`, { params: { limit } });

    req.subscribe(response => {
      // console.log('x-tracker-pagination-offset', response.headers.get('x-tracker-pagination-offset'));
      // console.log('x-tracker-pagination-limit', response.headers.get('x-tracker-pagination-limit'));
      // console.log('x-tracker-pagination-total', response.headers.get('x-tracker-pagination-total'));
      // console.log('x-tracker-pagination-returned', response.headers.get('x-tracker-pagination-returned'));

      this.data$.next(response.body as StoryResponse[]);
    });

    return req.pipe(map(response => response.body));
  }

  getAll(projectId: string, options: any = {}) {
    const {
      offset = 0,
      limit = 100
    } = options;

    const req = this.pivotalAPI.get(`/projects/${projectId}/stories`, { params: { offset, limit } })
      .pipe(
        mergeMap((response) => {
          // Get current items, and concat with the next set of paginations
          const items$ = from(response.body as Observable<any>);
          const paginationOffset = +response.headers.get('x-tracker-pagination-offset');
          const nextOffset = paginationOffset + 100;
          const paginationTotal = +response.headers.get('x-tracker-pagination-total');
          const next$ = (nextOffset < paginationTotal) ? this.getAll(projectId, { offset: nextOffset }) : EMPTY;

          return concat(items$, next$);
        })
      );

    req.subscribe(story => {
      this.data$.next(story as StoryResponse[]);
    });

    return req;
  }
}
