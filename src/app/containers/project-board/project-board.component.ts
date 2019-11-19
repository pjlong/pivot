import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProjectMembershipResponse, ProjectMembershipsService } from '@app/resources/project-memberships.service';
import { StoriesService, StoryResponse } from '@app/resources/stories.service';

@Component({
  selector: 'pt-project-board',
  template: `
    <nav class="navbar navbar-dark sticky-top bg-dark">
      <h1 class="navbar-brand">Board View</h1>
      <a [routerLink]="['/project/' + projectId]">
        Back to Project
      </a>
    </nav>
    <section class="viewport px-3">
      <section class="pool mt-4 mb-5 py-2" [style.width.rem]="(21 + 1) * displayOrder.length" *ngIf="stories.length">
        <div class="swimlane mr-3" *ngFor="let stateName of displayOrder">
          <header>
            <h2 class="d-inline mr-1">{{ stateName | titlecase }}</h2>
            <span>({{ displayGroups[stateName]?.length }})</span>
          </header>
          <div class="y-scroll pb-3">
            <div *ngFor="let story of displayGroups[stateName]">
              <article
                class="card my-3"
                [ngClass]="{
                  'alert-warning': story.story_type === 'feature',
                  'alert-danger': story.story_type === 'bug',
                  'alert-secondary': story.story_type === 'chore'
                }"
                (click)="openStoryModal(content, stateName, story.id)"
              >
                <header class="card-body">
                  <h5>{{ story.name }}</h5>
                </header>
                <div class="card-body pt-0">
                  <div class="d-flex flex-row">
                    <span class="badge badge-light mr-1 mb-2">
                      <i
                        class="fas"
                        [ngClass]="{
                          'fa-star text-warning': story.story_type === 'feature',
                          'fa-bug text-danger': story.story_type === 'bug',
                          'fa-wrench text-secondary': story.story_type === 'chore'
                        }"
                      ></i>
                      {{ story.story_type }}
                    </span>
                    <span class="badge badge-secondary mr-1 mb-2">{{ story.requester?.name || '--' }}</span>
                    <span class="badge badge-info mb-2">
                      <i class="fas fa-signal"></i>
                      {{ story.estimate || 'unestimated' }}
                    </span>
                  </div>
                  <div class="d-flex flex-row flex-wrap">
                    <span
                      class="badge badge-dark badge-label mr-1 mb-2"
                      [title]="label.name"
                      *ngFor="let label of story.labels"
                    >{{ label.name }}
                    </span>
                  </div>
                  <div class="d-flex flex-row-reverse">
                    <span
                      class="badge badge-primary mt-2 mr-1"
                      *ngFor="let owner of story.owners"
                      [title]="owner?.name"
                    >{{ owner?.initials | uppercase }}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </section>
    <ng-template #content let-modal>
      <header class="modal-header">
        <h4 class="modal-title">{{ focusedStory?.name }}</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <i aria-hidden="true">&times;</i>
        </button>
      </header>
      <div class="modal-body container-fluid">
        <div class="row">
          <p class="col-sm-7 col-lg-9">{{ focusedStory?.description }}</p>
          <div class="col-sm-5 col-lg-3">
            <div class="mb-2">
              <h4>Story Type:</h4>
              <span>
                <i
                  class="fas"
                  [ngClass]="{
                    'fa-star text-warning': focusedStory.story_type === 'feature',
                    'fa-bug text-danger': focusedStory.story_type === 'bug',
                    'fa-wrench text-secondary': focusedStory.story_type === 'chore'
                  }"
                ></i>
                {{ focusedStory?.story_type }}
              </span>
            </div>
            <div class="mb-2">
              <h4>Requester:</h4>
              <span>{{ focusedStory?.requester.name || 'None' }}</span>
            </div>
            <div class="mb-2">
              <h4>Owners:</h4>
              <span class="d-block" *ngFor="let owner of focusedStory?.owners">
                {{ owner?.name }}
              </span>
              <span class="text-muted" *ngIf="focusedStory?.owners.length === 0">None</span>
            </div>
            <div class="mb-2">
              <h4>Estimate:</h4>
              <span>{{ focusedStory?.estimate || 'unestimated' }}</span>
            </div>
            <div class="mb-2">
              <h4>Labels:</h4>
              <span class="badge badge-dark" *ngFor="let label of focusedStory?.labels">
                {{ label.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  projectId: string;
  stories: StoryResponse[] = [];
  memberships: ProjectMembershipResponse[] = [];
  peopleMap = {};
  displayGroups = {};
  displayOrder = ['unscheduled', 'unstarted', 'started', 'finished', 'delivered', 'accepted'];
  focusedStory?: StoryResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storiesService: StoriesService,
    private projectMembershipService: ProjectMembershipsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    let storiesObservable: Observable<object>;
    let membershipsObservable: Observable<object>;

    this.activatedRoute.paramMap
      .subscribe(params => {
        this.projectId = params.get('id');
        storiesObservable = this.storiesService.get(this.projectId, { limit: 1000 });
        membershipsObservable = this.projectMembershipService.get(this.projectId);
      });

    forkJoin([storiesObservable, membershipsObservable])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([stories, memberships]) => {
        this.stories = stories as StoryResponse[];
        this.memberships = memberships as ProjectMembershipResponse[];

        console.log('stories', stories);
        console.log('memberships', memberships);

        this.memberships.forEach(({ person }) => {
          this.peopleMap[person.id] = person;
        });

        this.stories.forEach(story => {
          story.requester = this.peopleMap[story.requested_by_id];
          story.owners = story.owner_ids.map(ownerId => this.peopleMap[ownerId]);

          if (!this.displayGroups[story.current_state]) {
            this.displayGroups[story.current_state] = [];
          }

          this.displayGroups[story.current_state].push(story);
        });
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openStoryModal(content: TemplateRef<Element>, state: string, storyId: number | string) {
    this.focusedStory = this.findStory(state, storyId);
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

  private findStory(state: string, storyId: number | string): StoryResponse | null {
    const storyGroup = this.displayGroups[state];
    const story = storyGroup.find(({ id }: { id: number | string }) => id === storyId);
    return story;
  }
}
