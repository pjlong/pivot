import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import { BaseElement } from '@app/resources';
import {
  StoryCommentResponse,
  StoryCommentsService,
} from '@app/resources/story-comments.service';
import {
  StoryTasksService,
  StoryTaskResponse,
} from '@app/resources/story-tasks.service';
import { StoryResponse } from '@app/resources/story.service';

@Component({
  selector: 'pt-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent implements OnInit, OnDestroy {
  @Input() story: StoryResponse;
  fullStory?: StoryResponse;

  status = {
    description: {
      collapse: false,
    },
    tasks: {
      collapse: false,
      loading: false,
    },
    comments: {
      collapse: false,
      loading: false,
    },
  };
  private projectId: string;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyTasksService: StoryTasksService,
    private storyCommentsService: StoryCommentsService,
    private peopleStore: PeopleStoreService
  ) {}

  ngOnInit(): void {
    this.status.tasks.loading = true;
    this.status.comments.loading = true;

    if (this.story) {
      this.fullStory = this.story;
      this.fullStory.story_tasks = [];
      this.fullStory.story_comments = []; // TODO: move to story service?
    }

    this.activatedRoute.parent.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.projectId = param.get('id');
        this.storyTasksService.get(this.projectId, this.story.id);
        this.storyCommentsService.get(this.projectId, this.story.id);
      });

    this.storyCommentsService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((storyComments: StoryCommentResponse[]) => {
        this.fullStory.story_comments = storyComments.map(comment => {
          comment.commenter = this.peopleStore.getById(comment.person_id);
          return comment;
        });
        this.status.comments.loading = false;
      });

    this.storyTasksService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((storyTasks: StoryTaskResponse[]) => {
        this.fullStory.story_tasks = storyTasks;
        this.status.tasks.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(resource: BaseElement): string {
    return resource.id;
  }
}
