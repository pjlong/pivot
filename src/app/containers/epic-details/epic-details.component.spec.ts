import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { EpicService } from '@app/store/epic';
import { StoryService } from '@app/store/story/story.service';

import { EpicDetailsComponent } from './epic-details.component';

describe('EpicDetailsComponent', () => {
  let component: EpicDetailsComponent;
  let fixture: ComponentFixture<EpicDetailsComponent>;
  const activatedRouteMock = {
    paramMap: of({ get: jest.fn(() => '123') }),
    parent: { paramMap: of({ get: jest.fn(() => '123') }) },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EpicDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: EpicService, useValue: new ResourceMockService() },
        { provide: StoryService, useValue: new ResourceMockService() },
        NgbModal,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
