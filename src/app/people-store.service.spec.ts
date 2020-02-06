import { TestBed } from '@angular/core/testing';

import { PeopleStoreService } from './people-store.service';

describe('PeopleStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeopleStoreService = TestBed.get(PeopleStoreService);
    expect(service).toBeTruthy();
  });
});
