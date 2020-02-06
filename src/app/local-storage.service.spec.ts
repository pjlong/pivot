import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  const prefix = 'foobar';
  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useFactory: (): LocalStorageService =>
            LocalStorageService.withPrefix(prefix),
        },
      ],
    });

    getItemSpy = jest
      .spyOn(window.localStorage, 'getItem')
      .mockImplementation(() => '');
    setItemSpy = jest
      .spyOn(window.localStorage, 'setItem')
      .mockImplementation(() => {});
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('sets values with prefixed keys', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    service.set('test', 'abc123');
    expect(setItemSpy).toHaveBeenCalledWith('foobar:test', 'abc123');
  });
});
