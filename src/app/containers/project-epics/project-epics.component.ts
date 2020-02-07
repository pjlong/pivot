import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { EpicResponse } from '@app/resources/epic.service';
import { EpicsService } from '@app/resources/epics.service';
import {
  ProjectResponse,
  ProjectService,
} from '@app/resources/project.service';

@Component({
  selector: 'pt-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
})
export class ProjectEpicsComponent implements OnInit, OnDestroy {
  project: ProjectResponse;
  epics: EpicResponse[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private epicsService: EpicsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.projectService.get(params.get('id'));
      this.epicsService.get(params.get('id'));
    });

    this.projectService.model$
      .pipe(take(1))
      .subscribe((project: ProjectResponse) => {
        this.project = project;
      });

    this.epicsService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((epics: EpicResponse[]) => {
        this.epics = epics;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
