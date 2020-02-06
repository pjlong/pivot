import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';

import { peopleStoreMockService } from '@app/__mocks__/people-store-mock.service';
import { ResourceMockService } from '@app/__mocks__/resource-mock.service';
import { PeopleStoreService } from '@app/people-store.service';
import { StoryCommentsService } from '@app/resources/story-comments.service';

import { StoryModalContentComponent } from './story-modal-content.component';

describe('StoryModalContentComponent', () => {
  let component: StoryModalContentComponent;
  let fixture: ComponentFixture<StoryModalContentComponent>;

  const activatedRouteMock = {
    parent: {
      paramMap: of({
        get: () => 'abc123',
      }),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryModalContentComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: StoryCommentsService, useValue: new ResourceMockService() },
        { provide: PeopleStoreService, useValue: peopleStoreMockService },
        NgbModal,
      ],
      imports: [RouterTestingModule, MarkdownModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
