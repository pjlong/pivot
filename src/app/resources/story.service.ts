import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { LabelResponse } from './epic.service';
import { PersonResponse } from './project-memberships.service';
import { StoryCommentResponse } from './story-comments.service';
import { StoryTaskResponse } from './story-tasks.service';

import { PtElement, BaseResource } from '.';

export interface StoryResponse extends PtElement {
  kind: 'story';
  story_type: 'bug' | 'feature' | 'chore';
  name: string;
  description: string;
  current_state: string;
  requested_by_id: number;
  url: string;
  owner_ids: number[];
  labels: LabelResponse[];
  estimate: number;

  // Non API properties
  owners: PersonResponse[];
  requester: PersonResponse;
  story_comments?: StoryCommentResponse[];
  story_tasks?: StoryTaskResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class StoryService extends BaseResource<StoryResponse> {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string, storyId: string): Observable<StoryResponse> {
    const req = this.pivotalAPI
      .get<StoryResponse>(`/projects/${projectId}/stories/${storyId}`)
      .pipe(map(response => response.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
