import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  StoryService,
  StoryQuery,
  StoriesGroupedByOwner,
  StoriesGroupedByState,
  StoryStateName,
  Story,
} from '@app/store/story';

@Component({
  selector: 'pt-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss'],
})
export class ProjectTeamComponent implements OnInit, OnDestroy {
  @ViewChild('storyModal', { static: true }) storyModal: TemplateRef<NgbModal>;
  displayOrder: StoryStateName[] = [
    'planned',
    'unscheduled',
    'unstarted',
    'started',
    'finished',
    'delivered',
    'accepted',
  ];
  projectId: string;
  storiesByOwner: StoriesGroupedByOwner;
  ownerIds: string[];
  collapseState: { [key: string]: boolean } = {};
  ownerMetadata: {
    [key: string]: { pointCount: number; storyCount: number };
  } = {};
  focusedStory?: Story;
  focusedStoryLoading: boolean;
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

    this.storyQuery.asTeam$.subscribe(
      (storiesByOwner: StoriesGroupedByOwner) => {
        this.storiesByOwner = storiesByOwner;
        this.ownerIds = Object.keys(this.storiesByOwner);

        this.ownerIds.forEach((id: string) => {
          // Set collapse state
          if (this.ownerOnlyHasAcceptedStories(id)) {
            this.collapseState[id] = true;
          } else {
            this.collapseState[id] = false;
          }

          this.ownerMetadata[id] = this.getStoryPointCount(id);
        });
      }
    );

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

  getStories(ownerId: string, stateName: string): Story[] {
    if (this.storiesByOwner[ownerId]) {
      if (this.storiesByOwner[ownerId][stateName]) {
        return this.storiesByOwner[ownerId][stateName];
      }
    }
    return null;
  }

  toggleCollapse(ownerId: string): void {
    console.log('toggle');
    this.collapseState[ownerId] = !this.collapseState[ownerId];
  }

  ownerOnlyHasAcceptedStories(id: string): boolean {
    const stateKeys = Object.keys(this.storiesByOwner[id]);
    stateKeys.splice(stateKeys.indexOf('_'), 1);

    return stateKeys.length === 1 && stateKeys.includes('accepted');
  }

  getStoryPointCount(
    ownerId: string
  ): { storyCount: number; pointCount: number } {
    const storiesByState = this.storiesByOwner[ownerId];
    const totals = {
      storyCount: 0,
      pointCount: 0,
    };

    this.displayOrder.forEach((stateName: string) => {
      if (stateName === 'accepted') return;
      const stories = storiesByState[stateName];
      if (stories) {
        stories.forEach((story: Story) => {
          totals.storyCount += 1;
          totals.pointCount += story.estimate || 0;
        });
      }
    });
    return totals;
  }

  openStoryModal(story: Story): void {
    this.storyService.focusStory(story);

    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }

    this.modalService.open(this.storyModal, { size: 'xl', scrollable: true });
  }
}
