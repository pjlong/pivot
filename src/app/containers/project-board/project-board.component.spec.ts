import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';

import { projectMembershipMockService } from '@app/__mocks__/project-membership-mock.service';
import { storiesMockService } from '@app/__mocks__/stories-mock.service';
import { StoryModalContentComponent } from '@app/components/story-modal-content/story-modal-content.component';
import { ProjectMembershipsService } from '@app/resources/project-memberships.service';
import { StoriesService } from '@app/resources/stories.service';

import { ProjectBoardComponent } from './project-board.component';

describe('ProjectBoardComponent', () => {
  let component: ProjectBoardComponent;
  let fixture: ComponentFixture<ProjectBoardComponent>;
  const activatedRouteMock = {
    parent: {
      paramMap: of({
        get: jest.fn(() => '123'),
      }),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBoardComponent, StoryModalContentComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: StoriesService, useValue: storiesMockService },
        {
          provide: ProjectMembershipsService,
          useValue: projectMembershipMockService,
        },
        NgbModal,
      ],
      imports: [MarkdownModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
