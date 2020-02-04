import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { BaseResource } from '.';

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
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(id: string): Observable<ProjectResponse> {
    const req = this.pivotalAPI
      .get<ProjectResponse>(`/projects/${id}`)
      .pipe(map(r => r.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
