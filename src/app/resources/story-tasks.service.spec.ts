import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { StoryTasksService } from './story-tasks.service';

describe('StoryTasksService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StoryTasksService,
        { provide: PivotalAPIService, useValue: pivotalAPIMockService },
      ],
    })
  );

  it('should be created', () => {
    const service: StoryTasksService = TestBed.get(StoryTasksService);
    expect(service).toBeTruthy();
  });
});
