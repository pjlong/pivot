import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { Epic } from './epic.model';
import { EpicStore } from './epic.store';

@Injectable({ providedIn: 'root' })
export class EpicService {
  constructor(
    private epicStore: EpicStore,
    private pivotalAPI: PivotalAPIService
  ) {}

  set(epicId: string): void {
    this.epicStore.setActive(epicId);
  }

  get(projectId: string, epicId: string): Observable<Epic> {
    const params = {
      fields: [':default', 'followers', 'comments'].join(','),
    };

    const req = this.pivotalAPI
      .get<Epic>(`/projects/${projectId}/epics/${epicId}`, {
        params,
      })
      .pipe(map(r => r.body));

    req.subscribe({
      next: response => {
        this.epicStore.add(response);
        this.epicStore.setActive(response.id);
      },
    });

    return req;
  }

  getAll(projectId: string): Observable<Epic[]> {
    const params = {
      fields: [':default', 'followers'].join(','),
    };

    const req = this.pivotalAPI
      .get<Epic[]>(`/projects/${projectId}/epics`, {
        params,
      })
      .pipe(map(r => r.body));

    req.subscribe({
      next: response => {
        this.epicStore.set(response);
      },
    });

    return req;
  }
}
