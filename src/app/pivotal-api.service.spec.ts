import { TestBed } from '@angular/core/testing';

import { PivotalAPIService } from './pivotal-api.service';

describe('PivotalAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PivotalAPIService = TestBed.get(PivotalAPIService);
    expect(service).toBeTruthy();
  });
});
