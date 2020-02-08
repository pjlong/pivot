import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseElement } from '@app/resources';
import { Story } from '@app/store/story';

@Component({
  selector: 'pt-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent implements OnInit, OnDestroy {
  @Input() story: Story;
  fullStory?: Story;

  // TODO: not being used, migrate to using Akita
  status = {
    description: {
      collapse: false,
    },
    tasks: {
      collapse: false,
    },
    comments: {
      collapse: false,
    },
  };
  projectId: string;
  private destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.story) {
      this.fullStory = this.story;
    }

    this.activatedRoute.parent.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(param => {
        this.projectId = param.get('id');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(resource: BaseElement): string {
    return resource.id;
  }
}
