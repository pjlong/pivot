import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { LocalStorageService } from '@app/local-storage.service';

import { StoryStateName } from '../story';

export interface BoardState {
  stateSwimlane: {
    [key in StoryStateName]: boolean;
  };
}

export const createInitialState = (): BoardState => {
  return {
    stateSwimlane: {
      planned: true,
      unscheduled: true,
      unstarted: true,
      started: true,
      finished: true,
      delivered: true,
      accepted: true,
    },
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'board' })
export class BoardStore extends Store<BoardState> {
  constructor(private localStorage: LocalStorageService) {
    super(createInitialState());
    this.initBoardStatesFromLocalStorage();
  }

  private initBoardStatesFromLocalStorage(): void {
    // Get a list of states to hide
    const boardState = this.localStorage.get('hideStates') || '';

    // Set each state in storage to "false"
    boardState.split(',').forEach((stateName: StoryStateName) => {
      this.update(state => ({
        ...state,
        stateSwimlane: { ...state.stateSwimlane, [stateName]: false },
      }));
    });
  }
}
