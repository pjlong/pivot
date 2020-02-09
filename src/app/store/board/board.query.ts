import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BoardStore, BoardState } from './board.store';

@Injectable({ providedIn: 'root' })
export class BoardQuery extends Query<BoardState> {
  activeStateKeys$: Observable<string[]> = this.select('stateSwimlane').pipe(
    map(states =>
      Object.entries(states)
        .filter(([, value]) => value)
        .map(([key]) => key)
    )
  );

  inactiveStateKeys$: Observable<string[]> = this.select('stateSwimlane').pipe(
    map(states =>
      Object.entries(states)
        .filter(([, value]) => !value)
        .map(([key]) => key)
        .filter(key => !!key)
    )
  );

  constructor(protected store: BoardStore) {
    super(store);
  }
}
