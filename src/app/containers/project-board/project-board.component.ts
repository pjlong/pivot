import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
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

    this.boardQuery.inactiveStateKeys$.subscribe(states => {
      this.inactiveStateKeys = states;
    });

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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectStory(story: Story): void {
    this.storyService.focusStory(story);
  }

  toggleSwimlane(stateName: StoryStateName): void {
    this.boardService.toggleSwimlane(stateName);
  }

  stateIsInactive(stateName: StoryStateName): boolean {
    return this.inactiveStateKeys.includes(stateName);
  }
}
