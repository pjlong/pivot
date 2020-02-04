import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { ProjectMembershipsService } from './project-memberships.service';

describe('ProjectMembershipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectMembershipsService,
        {
          provide: PivotalAPIService,
          useValue: pivotalAPIMockService,
        },
      ],
    });
  });

  it('should be created', () => {
    const service = TestBed.get(ProjectMembershipsService);
    expect(service).toBeTruthy();
  });
});
