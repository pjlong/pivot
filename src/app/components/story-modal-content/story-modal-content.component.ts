import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import {
  StoryCommentResponse,
  StoryCommentsService,
  FileAttachmentResponse,
} from '@app/resources/story-comments.service';
import { StoryResponse } from '@app/resources/story.service';

@Component({
  selector: 'pt-story-modal-content',
  templateUrl: './story-modal-content.component.html',
  styleUrls: ['./story-modal-content.component.scss'],
})
export class StoryModalContentComponent
  implements OnInit, OnChanges, OnDestroy {
  @ViewChild('attachmentModal', { static: true }) attachmentModal: TemplateRef<
    NgbModal
  >;
  @Input() story: StoryResponse;
  fullStory?: StoryResponse;
  selectedAttachment: FileAttachmentResponse;
  private projectId: string;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyCommentsService: StoryCommentsService,
    private peopleStore: PeopleStoreService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.fullStory = this.story;
    this.fullStory.story_comments = []; // TODO: move to story service?

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

  openAttachmentImageModal(attachment: FileAttachmentResponse): void {
    this.selectedAttachment = attachment;
    this.ngbModal.open(this.attachmentModal, { size: 'xl' });
  }
}
