import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '@env';

import { httpClientMock } from './__mocks__/http-client-mock';
import { localStorageMockService } from './__mocks__/local-storage-mock.service';
import { LocalStorageService } from './local-storage.service';
import { PivotalAPIService } from './pivotal-api.service';

describe('PivotalAPIService', () => {
  let service: PivotalAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PivotalAPIService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: LocalStorageService, useValue: localStorageMockService },
      ],
    });

    service = TestBed.get(PivotalAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#get', () => {
    it('uses pivotal API endpoint', () => {
      const path = '/foo';
      service.get(path);
      expect(httpClientMock.get.mock.calls[0][0]).toBe(
        `${environment.apiHost}/https://pivotaltracker.com/services/v5/foo`
      );
    });

    it('sets X-TrackerToken with API Key', () => {
      const apiKey = 'foobar';
      localStorageMockService.get.mockImplementation(() => apiKey);
      service.get('');
      const { headers } = httpClientMock.get.mock.calls[0][1];
      expect(headers.get('X-TrackerToken')).toBe(apiKey);
    });
  });

  describe('#post', () => {
    it('uses pivotal API endpoint', () => {
      const path = '/foo';
      service.post(path, {});
      expect(httpClientMock.post.mock.calls[0][0]).toBe(
        `${environment.apiHost}/https://pivotaltracker.com/services/v5/foo`
      );
    });

    it('sets X-TrackerToken with API Key', () => {
      const apiKey = 'foobar';
      localStorageMockService.post.mockImplementation(() => apiKey);
      service.post('', {});
      const { headers } = httpClientMock.post.mock.calls[0][1];
      expect(headers.get('X-TrackerToken')).toBe(apiKey);
    });
  });
});
