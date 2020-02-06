import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { StoryCommentsService } from './story-comments.service';

describe('StoryCommentsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StoryCommentsService,
        { provide: PivotalAPIService, useValue: pivotalAPIMockService },
      ],
    })
  );

  it('should be created', () => {
    const service: StoryCommentsService = TestBed.get(StoryCommentsService);
    expect(service).toBeTruthy();
  });
});
