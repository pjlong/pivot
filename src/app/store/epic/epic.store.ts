import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';

import { Epic } from './epic.model';

export interface EpicState extends EntityState<Epic>, ActiveState {}

const initialState = {
  active: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'epic',
})
export class EpicStore extends EntityStore<EpicState> {
  constructor() {
    super(initialState);
  }
}
