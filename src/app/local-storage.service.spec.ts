import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useFactory: (): LocalStorageService => new LocalStorageService(''),
        },
      ],
    });

    jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => '');
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(() => {});
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
