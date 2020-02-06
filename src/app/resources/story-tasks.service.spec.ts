import { TestBed } from '@angular/core/testing';

import { StoryTasksService } from './story-tasks.service';

describe('StoryTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryTasksService = TestBed.get(StoryTasksService);
    expect(service).toBeTruthy();
  });
});
