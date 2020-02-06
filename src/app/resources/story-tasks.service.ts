import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { BaseResource, BaseElement } from '.';

export interface StoryTaskResponse extends BaseElement {
  kind: 'task';
  story_id: number;
  description: string;
  complete: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoryTasksService extends BaseResource<StoryTaskResponse[]> {
  protected data$ = new Subject<StoryTaskResponse[]>();

  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string, storyId: string): Observable<StoryTaskResponse[]> {
    const req = this.pivotalAPI
      .get<StoryTaskResponse[]>(
        `/projects/${projectId}/stories/${storyId}/tasks`
      )
      .pipe(map(response => response.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
