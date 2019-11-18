import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProjectResponse, ProjectService } from 'src/app/resources/project.service';

@Component({
  selector: 'pt-project-dashboard',
  template: `
    <section *ngIf="project">
      <h1>Project: {{ project.name }}</h1>
    </section>
  `,
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  project: ProjectResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.projectService.get(params.get('id'));
      });

    this.projectService.model$
      .pipe(take(1))
      .subscribe((project: ProjectResponse) => {
        console.log('project', project);
        this.project = project;
      });
  }
}
