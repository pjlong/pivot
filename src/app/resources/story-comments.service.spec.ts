import { TestBed } from '@angular/core/testing';

import { StoryCommentsService } from './story-comments.service';

describe('StoryCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryCommentsService = TestBed.get(StoryCommentsService);
    expect(service).toBeTruthy();
  });
});
