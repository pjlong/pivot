import { Injectable } from '@angular/core';

import { LocalStorageService } from '@app/local-storage.service';

import { StoryStateName } from '../story';
import { BoardStore, BoardState } from './board.store';

@Injectable({ providedIn: 'root' })
export class BoardService {
  constructor(
    private boardStore: BoardStore,
    private localStorage: LocalStorageService
  ) {}

  toggleSwimlane(stateName: StoryStateName): boolean {
    let newSwimlaneState: boolean;
    this.boardStore.update(state => {
      newSwimlaneState = !state.stateSwimlane[stateName];

      const newState: BoardState = {
        ...state,
        stateSwimlane: {
          ...state.stateSwimlane,
          [stateName]: newSwimlaneState,
        },
      };

      if (newSwimlaneState) {
        this.localStorage.remove('hideStates', stateName);
      } else {
        this.localStorage.add('hideStates', stateName);
      }

      return newState;
    });
    return newSwimlaneState;
  }
}
