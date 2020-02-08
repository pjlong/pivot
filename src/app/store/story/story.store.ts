import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Story } from './story.model';

export interface StoryState extends EntityState<Story> {
  focused: Story;
  focusLoading: boolean;
}

const initialState = {
  focused: null,
  focusLoading: false,
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
