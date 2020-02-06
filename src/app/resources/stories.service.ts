import { Injectable } from '@angular/core';
import { concat, EMPTY, from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { StoryResponse } from './story.service';

import { BaseResource } from '.';

@Injectable({
  providedIn: 'root',
})
export class StoriesService extends BaseResource<StoryResponse[]> {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string, options: any = {}): Observable<StoryResponse[]> {
    const { limit = 100 } = options;
    const req = this.pivotalAPI
      .get<StoryResponse[]>(`/projects/${projectId}/stories`, {
        params: { limit },
      })
      .pipe(map(response => response.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
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
