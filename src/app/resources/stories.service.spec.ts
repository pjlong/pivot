import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StoriesService,
        { provide: PivotalAPIService, useValue: pivotalAPIMockService },
      ],
    })
  );

  it('gets Stories', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    expect(service).toBeTruthy();
  });
});
