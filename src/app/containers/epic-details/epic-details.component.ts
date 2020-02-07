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
import { takeUntil } from 'rxjs/operators';

import { PeopleStoreService } from '@app/people-store.service';
import { EpicService, EpicResponse } from '@app/resources/epic.service';
import { StoriesService } from '@app/resources/stories.service';
import { StoryResponse } from '@app/resources/story.service';

@Component({
  selector: 'pt-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('storyModal', { static: true }) storyModal: TemplateRef<NgbModal>;
  epic: EpicResponse;
  stories: StoryResponse[] = [];
  storyPoints: number;
  focusedStory: StoryResponse;
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
    private storiesService: StoriesService,
    private peopleStore: PeopleStoreService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.parent.paramMap, this.route.paramMap])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([parentParams, params]) => {
        this.epicService.get(parentParams.get('id'), params.get('epicId'));
      });

    this.epicService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((epic: EpicResponse) => {
        this.epic = epic;

        this.storiesService.get(epic.project_id.toString(), {
          label: epic.label.name,
        });
      });

    this.storiesService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stories: StoryResponse[]) => {
        this.stories = stories;
        this.storyPoints = this.getStoryPoints(stories);
        this.displayGroups = this.stories.reduce(
          (acc: any, story: StoryResponse) => {
            if (!acc[story.current_state]) {
              acc[story.current_state] = [];
            }
            acc[story.current_state].push(story);
            return acc;
          },
          {}
        );
        console.log('displayGroups', this.displayGroups);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal(story: StoryResponse): void {
    this.focusedStory = story;
    this.ngbModal.open(this.storyModal, { size: 'lg' });
  }

  private getStoryPoints(stories: StoryResponse[]): number {
    return stories.reduce((sum, story) => {
      sum += story.estimate ? +story.estimate : 0;
      return sum;
    }, 0);
  }
}
