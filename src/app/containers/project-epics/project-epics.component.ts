import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EpicService, Epic, EpicQuery } from '@app/store/epic';
import { Project, ProjectService, ProjectQuery } from '@app/store/project';

@Component({
  selector: 'pt-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss'],
})
export class ProjectEpicsComponent implements OnInit, OnDestroy {
  project: Project;
  epics: Epic[];
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery,
    private epicService: EpicService,
    private epicQuery: EpicQuery
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.epicService.getAll(params.get('projectId'));
    });

    this.projectQuery.selectActive().subscribe((project: Project) => {
      this.project = project;
    });

    this.epicQuery
      .selectAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((epics: Epic[]) => {
        this.epics = epics;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
