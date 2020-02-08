import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  StoryQuery,
  Story,
  StoryService,
  StoriesGroupedByState,
  StoryStateName,
} from '@app/store/story';

@Component({
  selector: 'pt-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  @ViewChild('storyModal', { static: true }) storyModal: TemplateRef<NgbModal>;
  projectId: string;
  displayGroups: StoriesGroupedByState;
  displayOrder: StoryStateName[] = [
    'unscheduled',
    'unstarted',
    'started',
    'finished',
    'delivered',
    'accepted',
  ];
  focusedStory?: Story;
  focusedStoryLoading: boolean;
  loading: boolean;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService,
    private storyQuery: StoryQuery,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
      this.storyService.get(this.projectId, { limit: 1000 });
    });

    this.storyQuery.asGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((groupedStories: StoriesGroupedByState) => {
        this.displayGroups = groupedStories;
      });

    this.storyQuery
      .selectLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });

    this.storyQuery.focusedStory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((focusedStory: Story) => {
        this.focusedStory = focusedStory;
      });

    this.storyQuery.focusLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.focusedStoryLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openStoryModal(story: Story): void {
    this.storyService.focusStory(story);

    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }

    this.modalService.open(this.storyModal, { size: 'xl', scrollable: true });
  }
}
