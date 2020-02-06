import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import {
  ProjectMembershipResponse,
  ProjectMembershipsService,
  PersonResponse,
} from '@app/resources/project-memberships.service';
import { StoriesService } from '@app/resources/stories.service';
import { StoryResponse } from '@app/resources/story.service';

@Component({
  selector: 'pt-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  projectId: string;
  stories: StoryResponse[] = [];
  memberships: ProjectMembershipResponse[] = [];
  peopleMap: { [key: string]: PersonResponse } = {};
  displayGroups = {};
  displayOrder = [
    'unscheduled',
    'unstarted',
    'started',
    'finished',
    'delivered',
    'accepted',
  ];
  focusedStory?: StoryResponse;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storiesService: StoriesService,
    private projectMembershipService: ProjectMembershipsService,
    private peopleStore: PeopleStoreService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let storiesObservable: Observable<object>;
    let membershipsObservable: Observable<object>;

    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      storiesObservable = this.storiesService.get(this.projectId, {
        limit: 1000,
      });
      membershipsObservable = this.projectMembershipService.get(this.projectId);
    });

    forkJoin([storiesObservable, membershipsObservable])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([stories, memberships]: [
          StoryResponse[],
          ProjectMembershipResponse[]
        ]) => {
          this.stories = stories;
          this.peopleStore.setPeopleFromMemberships(memberships);

          this.stories.forEach(story => {
            story.requester = this.peopleStore.getById(story.requested_by_id);
            story.owners = this.peopleStore.getByIds(story.owner_ids);

            if (!this.displayGroups[story.current_state]) {
              this.displayGroups[story.current_state] = [];
            }

            this.displayGroups[story.current_state].push(story);
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openStoryModal(
    content: TemplateRef<Element>,
    state: string,
    storyId: number | string
  ): void {
    this.focusedStory = this.findStory(state, storyId);
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  private findStory(
    state: string,
    storyId: number | string
  ): StoryResponse | null {
    const storyGroup = this.displayGroups[state];
    const story = storyGroup.find(
      ({ id }: { id: number | string }) => id === storyId
    );
    return story;
  }
}
