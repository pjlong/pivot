import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';

import { Project } from './project.model';

export interface ProjectState extends EntityState<Project>, ActiveState {}

const initialState = {
  active: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'project',
})
export class ProjectStore extends EntityStore<ProjectState> {
  constructor() {
    super(initialState);
  }
}
