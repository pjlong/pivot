import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { ProjectQuery, ProjectService } from '@app/store/project';

@Component({
  selector: 'pt-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
})
export class ProjectRootComponent implements OnInit, OnDestroy {
  projectId: string;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private projectQuery: ProjectQuery,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');

      if (this.projectQuery.getActiveId() !== this.projectId) {
        this.projectService.getProjectDetails(this.projectId);
        this.projectService.setActive(this.projectId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
