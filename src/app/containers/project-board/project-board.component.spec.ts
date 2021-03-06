import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';

import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { FileAttachmentPreviewComponent } from '@app/components/file-attachment-preview/file-attachment-preview.component';
import { StoryCommentComponent } from '@app/components/story-comment/story-comment.component';
import { StoryDetailsComponent } from '@app/components/story-details/story-details.component';
import { BytesizePipe } from '@app/pipes/bytesize.pipe';
import { StoryService } from '@app/store/story/story.service';

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
      declarations: [
        ProjectBoardComponent,
        StoryDetailsComponent,
        StoryCommentComponent,
        FileAttachmentPreviewComponent,
        BytesizePipe,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: StoryService, useValue: new ResourceMockService() },
        NgbModal,
      ],
      imports: [MarkdownModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
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
