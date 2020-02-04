import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { epicMockService } from '@app/__mocks__/epic-mock.service';
import { projectMockService } from '@app/__mocks__/project-mock.service';
import { EpicService } from '@app/resources/epic.service';
import { ProjectService } from '@app/resources/project.service';

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
      declarations: [ProjectEpicsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: projectMockService },
        { provide: EpicService, useValue: epicMockService },
      ],
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
