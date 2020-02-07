import { Injectable } from '@angular/core';
import { concat, EMPTY, from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { BaseResource } from '../../resources';
import { Story } from './story.model';
import { StoryStore } from './story.store';

@Injectable({
  providedIn: 'root',
})
export class StoryService extends BaseResource<Story[]> {
  constructor(
    private pivotalAPI: PivotalAPIService,
    private store: StoryStore
  ) {
    super();
  }

  get(projectId: string, options: any = {}): Observable<Story[]> {
    const params = {
      ...this.buildParams(options),
      fields: [':default', 'owners', 'requested_by'].join(','),
    };

    const req = this.pivotalAPI
      .get<Story[]>(`/projects/${projectId}/stories`, { params })
      .pipe(
        map(response => response.body),
        tap(stories => {
          this.store.set(stories);
        })
      );

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
  getAll(projectId: string, options: any = {}): Observable<Story[]> {
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
      ) as Observable<Story[]>;

    req.subscribe(story => {
      this.data$.next(story);
    });

    return req;
  }

  private buildParams(options: any): object {
    const { limit = 100, label } = options;
    const params: any = { limit };

    if (label) {
      params.with_label = label;
    }

    return params;
  }
}
