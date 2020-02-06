import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PivotalAPIService } from '@app/pivotal-api.service';

import { PersonResponse } from './project-memberships.service';

import { BaseResource, BaseElement } from '.';

export interface FileAttachmentResponse extends BaseElement {
  kind: 'file_attachment';
  filename: string;
  created_at: string;
  uploader_id: number;
  thumbnailable: boolean;
  height: number;
  width: number;
  size: number;
  download_url: string;
  content_type: string;
  uploaded: boolean;
  big_url: string;
  thumbnail_url: string;
}

export interface StoryCommentResponse extends BaseElement {
  kind: 'comment';
  story_id: number;
  epic_id: number;
  text: string;
  person_id: number;
  created_at: string;
  updated_at: string;
  file_attachments?: FileAttachmentResponse[];
  commit_identifier: string;
  commit_type: string;

  commenter?: PersonResponse;
}

@Injectable({
  providedIn: 'root',
})
export class StoryCommentsService extends BaseResource<StoryCommentResponse[]> {
  constructor(private pivotalAPI: PivotalAPIService) {
    super();
  }

  get(projectId: string, storyId: string): Observable<StoryCommentResponse[]> {
    const req = this.pivotalAPI
      .get<StoryCommentResponse[]>(
        `/projects/${projectId}/stories/${storyId}/comments`,
        { params: { fields: ':default,file_attachments' } }
      )
      .pipe(map(response => response.body));

    req.subscribe({
      next: response => {
        this.data$.next(response);
      },
    });

    return req;
  }
}
