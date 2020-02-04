import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { BaseResource, BaseElement, PtElement } from '.';

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
  providedIn: 'root',
})
export class ProjectMembershipsService extends BaseResource<
  ProjectMembershipResponse[]
> {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string): Observable<ProjectMembershipResponse[]> {
    const req = this.pivotalAPI
      .get<ProjectMembershipResponse[]>(`/projects/${projectId}/memberships`)
      .pipe(map(response => response.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
