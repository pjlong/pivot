import { Injectable } from '@angular/core';
import { concat, EMPTY, from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { BaseResource } from './base-resource';
import { LabelResponse } from './epic.service';
import { PersonResponse } from './project-memberships.service';

import { PtElement } from '.';

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
  estimate: number;

  // Non API properties
  owners: PersonResponse[];
  requester: PersonResponse;
}

@Injectable({
  providedIn: 'root',
})
export class StoriesService extends BaseResource<StoryResponse[]> {
  get(projectId: string, options: any = {}): Observable<StoryResponse[]> {
    const { limit = 100 } = options;
    const req = this.pivotalAPI
      .get(`/projects/${projectId}/stories`, {
        params: { limit },
      })
      .pipe(map(response => response.body)) as Observable<StoryResponse[]>;

    req.subscribe(response => {
      this.data$.next(response);
    });

    return req;
  }

  /**
   * Recursively fetches the next set of paginated Stories and appends into one object
   */
  getAll(projectId: string, options: any = {}): Observable<StoryResponse[]> {
    const { offset = 0, limit = 100 } = options;

    const req = this.pivotalAPI
      .get(`/projects/${projectId}/stories`, { params: { offset, limit } })
      .pipe(
        mergeMap(response => {
          // Get current items, and concat with the next set of paginations
          const items$ = from(response.body as Observable<any>);
          const paginationOffset = +response.headers.get(
            'x-tracker-pagination-offset'
          );
          const nextOffset = paginationOffset + 100;
          const paginationTotal = +response.headers.get(
            'x-tracker-pagination-total'
          );
          const next$ =
            nextOffset < paginationTotal
              ? this.getAll(projectId, { offset: nextOffset })
              : EMPTY;

          return concat(items$, next$);
        })
      ) as Observable<StoryResponse[]>;

    req.subscribe(story => {
      this.data$.next(story);
    });

    return req;
  }
}
