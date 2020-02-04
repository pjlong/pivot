import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseResource } from './base-resource';

export interface ProjectResponse {
  created_at: string; // datetime
  current_iteration_number: number;
  description: string;
  name: string;
  id: number;
  point_scale: string;
  week_start_day: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseResource<ProjectResponse> {
  get(id: string): Observable<ProjectResponse> {
    const req = this.pivotalAPI
      .get(`/projects/${id}`)
      .pipe(map(r => r.body)) as Observable<ProjectResponse>;

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
