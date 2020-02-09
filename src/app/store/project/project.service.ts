import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { Project } from './project.model';
import { ProjectStore } from './project.store';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(
    private projectStore: ProjectStore,
    private pivotalAPI: PivotalAPIService
  ) {}

  getProjectDetails(projectId: string): Observable<Project> {
    const req = this.pivotalAPI
      .get<Project>(`/projects/${projectId}`)
      .pipe(map(response => response.body));

    req.subscribe({
      next: (project: Project) => {
        console.log('project', project);
      },
    });

    return req;
  }

  getAll(): Observable<Project[]> {
    const params = {
      fields: [
        'id',
        'name',
        'status',
        'description',
        'profile_content',
        'iteration_length',
        'week_start_day',
        'point_scale',
        'bugs_and_chores_are_estimatable',
        'current_iteration_number',
        'current_velocity',
        'current_volatility',
        'story_ids',
        'epic_ids',
        'membership_ids',
      ].join(','),
    };

    const req = this.pivotalAPI
      .get<Project[]>('/projects', { params })
      .pipe(map(response => response.body));

    req.subscribe({
      next: (projects: Project[]) => {
        this.projectStore.set(projects);
      },
    });

    return req;
  }
}
