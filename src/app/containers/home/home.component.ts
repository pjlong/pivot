import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { MeService } from '@app/resources/me.service';
import { ProjectService, ProjectQuery, Project } from '@app/store/project';

@Component({
  selector: 'pt-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  me: any;
  projects: Project[] = [];

  constructor(
    private meService: MeService,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.meService.model$.pipe(take(1)).subscribe(response => {
      this.me = response;
    });

    this.projectQuery.selectAll().subscribe((projects: Project[]) => {
      this.projects = projects;
    });

    this.projectService.getAll();
    this.meService.get();
  }
}
