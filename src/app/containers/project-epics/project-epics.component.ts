import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { EpicResponse, EpicService } from '@app/resources/epic.service';
import { ProjectResponse, ProjectService } from '@app/resources/project.service';

@Component({
  selector: 'pt-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent implements OnInit, OnDestroy {
  project: ProjectResponse;
  epics: EpicResponse[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private epicService: EpicService,
  ) {

  }
  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.projectService.get(params.get('id'));
        this.epicService.get(params.get('id'));
      });

    this.projectService.model$
      .pipe(take(1))
      .subscribe((project: ProjectResponse) => {
        console.log('project', project);
        this.project = project;
      });

    this.epicService.model$
      .pipe(takeUntil(this.destroy$))
      .subscribe((epics: EpicResponse[]) => {
        console.log('epics', epics);
        this.epics = epics;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
