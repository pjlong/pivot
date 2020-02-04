import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { EpicService } from './epic.service';

describe('EpicService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        EpicService,
        {
          provide: PivotalAPIService,
          useValue: pivotalAPIMockService,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: EpicService = TestBed.get(EpicService);
    expect(service).toBeTruthy();
  });
});
