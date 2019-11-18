import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PivotalAPIService } from '../pivotal-api.service';

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
  providedIn: 'root'
})
export class ProjectService {
  private data$ = new BehaviorSubject<ProjectResponse>(null);

  readonly model$ = this.data$.asObservable().pipe(filter(x => x !== null));

  constructor(private pivotalAPI: PivotalAPIService) { }

  get(id: string) {
    const req = this.pivotalAPI.get(`/projects/${id}`);
    req.subscribe({
      next: response => {
        this.data$.next(response as ProjectResponse);
      }
    });
    return req;
  }
}
