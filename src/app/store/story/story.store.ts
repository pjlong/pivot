import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Story } from './story.model';

export interface StoryState extends EntityState<Story> {
  focused: Story;
}

const initialState = {
  focused: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'story',
})
export class StoryStore extends EntityStore<StoryState> {
  constructor() {
    super(initialState);
  }
}
