import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BoardService, BoardQuery } from '@app/store/board';
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
    'planned',
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
  boardState: { [key in StoryStateName]: boolean };
  inactiveStateKeys: string[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService,
    private storyQuery: StoryQuery,
    private boardService: BoardService,
    private boardQuery: BoardQuery,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.boardQuery.select('stateSwimlane').subscribe(boardState => {
      this.boardState = boardState;
    });

    combineLatest([
      this.activatedRoute.parent.paramMap,
      this.boardQuery.inactiveStateKeys$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, inactiveStates]) => {
        this.projectId = params.get('projectId');
        this.inactiveStateKeys = inactiveStates;

        const statesToFetch = this.displayOrder
          .filter(key => !inactiveStates.includes(key))
          .join(',');

        this.storyService.get(this.projectId, {
          limit: 1000,
          filter: `state:${statesToFetch}`,
        });
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

    this.storyQuery
      .selectActive()
      .pipe(takeUntil(this.destroy$))
      .subscribe((focusedStory: Story) => {
        this.focusedStory = focusedStory;
      });

    this.storyQuery.activeLoading$
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

  toggleSwimlane(stateName: StoryStateName): void {
    this.boardService.toggleSwimlane(stateName);
  }
}
