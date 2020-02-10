import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { StoryService } from '@app/store/story';

import { ProjectTeamComponent } from './project-team.component';

describe('ProjectTeamComponent', () => {
  let component: ProjectTeamComponent;
  let fixture: ComponentFixture<ProjectTeamComponent>;
  const activatedRouteMock = {
    parent: {
      paramMap: of({
        get: jest.fn(() => '123'),
      }),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTeamComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: StoryService, useValue: new ResourceMockService() },
        NgbModal,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
