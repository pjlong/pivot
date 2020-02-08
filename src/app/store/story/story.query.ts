import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Story, StoriesGroupedByState } from './story.model';
import { StoryStore, StoryState } from './story.store';

@Injectable({ providedIn: 'root' })
export class StoryQuery extends QueryEntity<StoryState> {
  focusedStory$ = this.select(state => state.focused).pipe(
    filter(entity => entity !== null)
  );

  focusLoading$ = this.select(state => state.focusLoading);

  constructor(protected store: StoryStore) {
    super(store);
  }

  // TODO: Computational overhead? Move to it's own property?
  get asGroups$(): Observable<StoriesGroupedByState> {
    return this.selectAll().pipe(
      map((stories: Story[]) =>
        stories.reduce((acc: StoriesGroupedByState, story: Story) => {
          if (!acc[story.current_state]) {
            acc[story.current_state] = [];
          }
          acc[story.current_state].push(story);
          return acc;
        }, {})
      )
    );
  }
}
