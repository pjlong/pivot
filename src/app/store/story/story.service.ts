import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { Story } from './story.model';
import { StoryStore, StoryState } from './story.store';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(
    private pivotalAPI: PivotalAPIService,
    private store: StoryStore
  ) {}

  getStoryDetails(projectId: string, storyId: string): Observable<Story> {
    const req = this.pivotalAPI
      .get<Story>(`/projects/${projectId}/stories/${storyId}`, {
        params: {
          fields: [
            'description',
            'tasks',
            'comments(:default,person,file_attachments)',
          ].join(','),
        },
      })
      .pipe(map(response => response.body));

    req.subscribe(story => {
      this.store.update((state: StoryState) => {
        return { ...state, focused: { ...state.focused, ...story } };
      });
    });

    return req;
  }

  get(projectId: string, options: any = {}): Observable<Story[]> {
    const params = {
      ...this.buildParams(options),
      fields: [
        'kind',
        'name',
        'url',
        'story_type',
        'current_state',
        'estimate',
        'labels',
        'owners',
        'requested_by',
      ].join(','),
    };

    const req = this.pivotalAPI
      .get<Story[]>(`/projects/${projectId}/stories`, { params })
      .pipe(map(response => response.body));

    req.subscribe(stories => {
      this.store.set(stories);
    });

    return req;
  }

  setFocusedStory(focused: Story): void {
    this.store.update({ focused });
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
