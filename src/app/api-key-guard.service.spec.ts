import { TestBed } from '@angular/core/testing';

import { ApiKeyGuardService } from './api-key-guard.service';

describe('ApiKeyGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiKeyGuardService = TestBed.get(ApiKeyGuardService);
    expect(service).toBeTruthy();
  });
});
