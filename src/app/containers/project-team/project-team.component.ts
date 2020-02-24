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

import { ProjectQuery, Project } from '@app/store/project';
import {
  StoryService,
  StoryQuery,
  StoriesGroupedByOwner,
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
  project: Project;
  storiesByOwner: StoriesGroupedByOwner;
  ownerIds: string[];
  ownerMetadata: {
    [key: string]: { pointCount: number; storyCount: number };
  } = {};
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService,
    private storyQuery: StoryQuery,
    private projectQuery: ProjectQuery
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
          this.ownerMetadata[id] = this.getStoryPointCount(id);
        });
      }
    );

    this.projectQuery.selectActive().subscribe((project: Project) => {
      this.project = project;
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

  selectStory(story: Story): void {
    this.storyService.focusStory(story);
  }
}
