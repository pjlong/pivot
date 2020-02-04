import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { httpClientMock } from './__mocks__/http-client-mock';
import { localStorageMockService } from './__mocks__/local-storage-mock.service';
import { LocalStorageService } from './local-storage.service';
import { PivotalAPIService } from './pivotal-api.service';

describe('PivotalAPIService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        PivotalAPIService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: LocalStorageService, useValue: localStorageMockService },
      ],
    })
  );

  it('should be created', () => {
    const service: PivotalAPIService = TestBed.get(PivotalAPIService);
    expect(service).toBeTruthy();
  });
});
