import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Person } from '@app/resources';

import {
  Story,
  StoriesGroupedByState,
  StoriesGroupedByOwner,
} from './story.model';
import { StoryStore, StoryState } from './story.store';

@Injectable({ providedIn: 'root' })
export class StoryQuery extends QueryEntity<StoryState> {
  activeLoading$ = this.select(state => state.activeLoading);

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

  get asTeam$(): Observable<StoriesGroupedByOwner> {
    return this.selectAll().pipe(
      map((stories: Story[]) =>
        stories.reduce((acc: StoriesGroupedByOwner, story: Story) => {
          story.owners.forEach((owner: Person) => {
            if (!acc[owner.id]) {
              acc[owner.id] = {};

              acc[owner.id]._ = owner;
            }

            if (!acc[owner.id][story.current_state]) {
              acc[owner.id][story.current_state] = [];
            }

            acc[owner.id][story.current_state].push(story);
          });

          return acc;
        }, {} as StoriesGroupedByOwner)
      )
    );
  }
}
