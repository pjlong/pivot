import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { EpicsService } from './epics.service';

describe('EpicsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        EpicsService,
        {
          provide: PivotalAPIService,
          useValue: pivotalAPIMockService,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: EpicsService = TestBed.get(EpicsService);
    expect(service).toBeTruthy();
  });
});
