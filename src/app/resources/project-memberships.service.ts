import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseElement, PtElement } from '.';
import { PivotalAPIService } from '../pivotal-api.service';

export interface PersonResponse extends BaseElement {
  kind: 'person';
  name: string;
  email: string;
  initials: string;
  username: string;
}

export interface ProjectMembershipResponse extends PtElement {
  kind: 'project_membership';
  favorite: boolean;
  person: PersonResponse;
  project_color: string;
  role: 'member';
}

@Injectable({
  providedIn: 'root'
})
export class ProjectMembershipsService {
  private data$ = new BehaviorSubject<ProjectMembershipResponse[]>(null);

  readonly model$ = this.data$.asObservable().pipe(filter(x => x !== null));

  constructor(private pivotalAPI: PivotalAPIService) { }

  get(projectId: string): Observable<object> {
    const req = this.pivotalAPI.get(`/projects/${projectId}/memberships`, null);
    req.subscribe({
      next: response => {
        this.data$.next(response.body as ProjectMembershipResponse[]);
      }
    });

    return req.pipe(map(response => response.body));
  }
}
