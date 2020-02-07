import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import {
  ProjectMembershipResponse,
  ProjectMembershipsService,
  PersonResponse,
} from '@app/resources/project-memberships.service';
import { StoryQuery, Story, StoryService } from '@app/store/story';

@Component({
  selector: 'pt-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  @ViewChild('storyModal', { static: true }) storyModal: TemplateRef<NgbModal>;
  projectId: string;
  stories: Story[] = [];
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
  focusedStory?: Story;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storyService: StoryService,
    private storyQuery: StoryQuery,
    private projectMembershipService: ProjectMembershipsService,
    private peopleStore: PeopleStoreService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let membershipsObservable: Observable<object>;

    const stories$: Observable<Story[]> = this.storyQuery.selectAll();
    stories$.pipe(tap(s => console.log('hi', s))).subscribe();

    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.storyService.get(this.projectId, {
        limit: 1000,
      });
      membershipsObservable = this.projectMembershipService.get(this.projectId);
    });

    combineLatest([stories$, membershipsObservable])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([stories, memberships]: [Story[], ProjectMembershipResponse[]]) => {
          console.log('stories', stories);
          this.stories = stories;
          this.peopleStore.setPeopleFromMemberships(memberships);

          this.stories.forEach(story => {
            // story.requester = this.peopleStore.getById(story.requested_by_id);
            // story.owners = this.peopleStore.getByIds(story.owner_ids);

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

  openStoryModal(story: Story): void {
    this.focusedStory = story;
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.modalService.open(this.storyModal, { size: 'lg', scrollable: true });
  }
}
