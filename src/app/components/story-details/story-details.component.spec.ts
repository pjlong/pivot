import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';

import { peopleStoreMockService } from '@app/__mocks__/people-store-mock.service';
import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { PeopleStoreService } from '@app/people-store.service';
import { StoryCommentsService } from '@app/resources/story-comments.service';

import { StoryCommentComponent } from '../story-comment/story-comment.component';
import { StoryDetailsComponent } from './story-details.component';

describe('StoryDetailsComponent', () => {
  let component: StoryDetailsComponent;
  let fixture: ComponentFixture<StoryDetailsComponent>;

  const activatedRouteMock = {
    parent: {
      paramMap: of({
        get: () => 'abc123',
      }),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryDetailsComponent, StoryCommentComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: StoryCommentsService, useValue: new ResourceMockService() },
        { provide: PeopleStoreService, useValue: peopleStoreMockService },
      ],
      imports: [RouterTestingModule, MarkdownModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
