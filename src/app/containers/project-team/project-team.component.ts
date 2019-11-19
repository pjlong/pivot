import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProjectMembershipResponse, ProjectMembershipsService } from '@app/resources/project-memberships.service';
import { StoriesService, StoryResponse } from '@app/resources/stories.service';

@Component({
  selector: 'pt-project-team',
  template: `
    <nav class="navbar navbar-dark sticky-top bg-dark">
      <h1 class="navbar-brand">Team View</h1>
      <a [routerLink]="['/project/' + projectId]">
        Back to Project
      </a>
    </nav>
    <section class="viewport pb-8">
      <section class="pool mt-4 mb-5 py-2" [style.width.rem]="20 * displayOrder.length" *ngIf="stories.length">
        <div class="swimlane mr-3" *ngFor="let stateName of displayOrder">
          <h2>{{ stateName | titlecase }}</h2>
          <div class="y-scroll">
            <div *ngFor="let story of displayGroups[stateName]">
              <article
                class="card my-3"
                [ngClass]="{
                  'alert-warning': story.story_type === 'feature',
                  'alert-danger': story.story_type === 'bug',
                  'alert-secondary': story.story_type === 'chore'
                }"
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
                    <span class="badge badge-primary mt-2" *ngFor="let owner of story.owners">{{ owner?.initials | uppercase }}</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </section>
  `,
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  projectId: string;
  stories: StoryResponse[] = [];
  memberships: ProjectMembershipResponse[] = [];
  peopleMap = {};
  displayGroups = {};
  displayOrder = ['unstarted', 'started', 'finished', 'delivered', 'accepted', 'rejected'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private storiesService: StoriesService,
    private projectMembershipService: ProjectMembershipsService
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


}
