import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { localStorageMockService } from './__mocks__/local-storage-mock.service';
import { ApiKeyGuardService } from './api-key-guard.service';
import { LocalStorageService } from './local-storage.service';

describe('ApiKeyGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ApiKeyGuardService,
        { provide: LocalStorageService, useValue: localStorageMockService },
      ],
      imports: [RouterTestingModule],
    })
  );

  it('should be created', () => {
    const guard: ApiKeyGuardService = TestBed.get(ApiKeyGuardService);
    expect(guard).toBeTruthy();
  });
});
