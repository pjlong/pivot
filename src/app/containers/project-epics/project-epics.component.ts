import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { EpicResponse } from '@app/resources/epic.service';
import { EpicsService } from '@app/resources/epics.service';
import { Project, ProjectService, ProjectQuery } from '@app/store/project';

@Component({
  selector: 'pt-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
})
export class ProjectEpicsComponent implements OnInit, OnDestroy {
  project: Project;
  epics: EpicResponse[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery,
    private epicsService: EpicsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.projectService.getProjectDetails(params.get('projectId'));
      this.epicsService.get(params.get('projectId'));
    });

    this.projectQuery.selectActive().subscribe((project: Project) => {
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
