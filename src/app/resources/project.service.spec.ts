import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        {
          provide: PivotalAPIService,
          useValue: pivotalAPIMockService,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
