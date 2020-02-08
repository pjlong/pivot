import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';

import { Story } from './story.model';

export interface StoryState extends EntityState<Story>, ActiveState {
  activeLoading: boolean;
}

const initialState = {
  active: null,
  activeLoading: false,
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
