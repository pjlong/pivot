import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { EpicStore, EpicState } from './epic.store';

@Injectable({ providedIn: 'root' })
export class EpicQuery extends QueryEntity<EpicState> {
  constructor(protected store: EpicStore) {
    super(store);
  }
}
