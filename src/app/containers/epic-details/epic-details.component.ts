import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { Epic, EpicService, EpicQuery } from '@app/store/epic';
import {
  Story,
  StoryService,
  StoryQuery,
  StoriesGroupedByState,
} from '@store/story';

@Component({
  selector: 'pt-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('storyModal', { static: true }) storyModal: TemplateRef<NgbModal>;
  epic: Epic;
  stories: Story[] = [];
  storyPoints: number;
  focusedStory: Story;
  displayGroups: {};
  displayOrder = [
    'planned',
    'unscheduled',
    'unstarted',
    'started',
    'finished',
    'delivered',
    'accepted',
  ];
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private epicService: EpicService,
    private epicQuery: EpicQuery,
    private storyService: StoryService,
    private storyQuery: StoryQuery,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.parent.paramMap, this.route.paramMap])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([parentParams, params]) => {
        this.epicService.get(
          parentParams.get('projectId'),
          params.get('epicId')
        );
      });

    this.epicQuery
      .selectActive()
      .pipe(takeUntil(this.destroy$), filter(Boolean))
      .subscribe((epic: Epic) => {
        this.epic = epic;

        this.storyService.get(epic.project_id.toString(), {
          label: epic.label.name,
        });
      });

    this.storyQuery
      .selectAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stories: Story[]) => {
        this.stories = stories;
      });

    this.storyQuery.asGroups$
      .pipe(takeUntil(this.destroy$))
      .subscribe((storiesGroupedByState: StoriesGroupedByState) => {
        this.displayGroups = storiesGroupedByState;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal(story: Story): void {
    this.focusedStory = story;
    this.ngbModal.open(this.storyModal, { size: 'lg' });
  }

  private getStoryPoints(stories: Story[]): number {
    return stories.reduce((sum, story) => {
      sum += story.estimate ? +story.estimate : 0;
      return sum;
    }, 0);
  }
}
