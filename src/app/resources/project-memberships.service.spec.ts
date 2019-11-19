import { TestBed } from '@angular/core/testing';

import { ProjectMembershipsService } from './project-memberships.service';

describe('ProjectMembershipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectMembershipsService = TestBed.get(ProjectMembershipsService);
    expect(service).toBeTruthy();
  });
});
