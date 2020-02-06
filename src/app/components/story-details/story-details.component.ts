import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import {
  StoryCommentResponse,
  StoryCommentsService,
} from '@app/resources/story-comments.service';
import { StoryResponse } from '@app/resources/story.service';

@Component({
  selector: 'pt-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() story: StoryResponse;
  fullStory?: StoryResponse;
  collapseDescription = false;
  collapseComments = false;
  private projectId: string;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyCommentsService: StoryCommentsService,
    private peopleStore: PeopleStoreService
  ) {}

  ngOnInit(): void {
    if (this.story) {
      this.fullStory = this.story;
      this.fullStory.story_comments = []; // TODO: move to story service?
    }

    this.activatedRoute.parent.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.projectId = param.get('id');
        this.storyCommentsService.get(this.projectId, this.story.id);
      });

    this.storyCommentsService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((storyComments: StoryCommentResponse[]) => {
        this.fullStory.story_comments = storyComments.map(comment => {
          comment.commenter = this.peopleStore.getById(comment.person_id);
          return comment;
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.story.isFirstChange()) {
      const {
        currentValue: currentStory,
        previousValue: previousStory,
      } = changes.story;
      if (currentStory.id !== previousStory.id) {
        this.fullStory = currentStory;
        this.storyCommentsService.get(this.projectId, currentStory.id);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.fullStory = null;
  }

  trackByCommentId(comment: StoryCommentResponse): string {
    return comment.id;
  }
}
