import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { StoryStore, StoryState } from './story.store';

@Injectable({ providedIn: 'root' })
export class StoryQuery extends QueryEntity<StoryState> {
  // asGroups$ = this.selectAll();

  constructor(protected store: StoryStore) {
    super(store);
  }
}
