import { TestBed } from '@angular/core/testing';

import { pivotalAPIMockService } from '@app/__mocks__/pivotal-api-mock.service';
import { PivotalAPIService } from '@app/pivotal-api.service';

import { MeService } from './me.service';

describe('MeService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        MeService,
        {
          provide: PivotalAPIService,
          useValue: pivotalAPIMockService,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: MeService = TestBed.get(MeService);
    expect(service).toBeTruthy();
  });
});
