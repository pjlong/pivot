import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { StoryService } from '../store/story/story.service';

describe('StoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StoryService,
        { provide: PivotalAPIService, useValue: pivotalAPIMockService },
      ],
    })
  );

  it('gets Stories', () => {
    const service: StoryService = TestBed.get(StoryService);
    expect(service).toBeTruthy();
  });
});
