import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';

import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { PersonBadgeComponent } from '@app/components/person-badge/person-badge.component';
import { ProjectService } from '@app/resources/project.service';
import { EpicService } from '@app/store/epic';

import { ProjectEpicsComponent } from './project-epics.component';

describe('ProjectEpicsComponent', () => {
  let component: ProjectEpicsComponent;
  let fixture: ComponentFixture<ProjectEpicsComponent>;
  const activatedRouteMock = {
    parent: {
      paramMap: of({ get: jest.fn(() => '123') }),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEpicsComponent, PersonBadgeComponent],
      imports: [RouterTestingModule, MarkdownModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: new ResourceMockService() },
        { provide: EpicService, useValue: new ResourceMockService() },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
