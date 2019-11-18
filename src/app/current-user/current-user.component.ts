import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pt-current-user',
  template: `
    <div *ngIf="user">
      <span>{{ user.name }}</span>
      <hr>
      <strong>Projects</strong>
      <ul *ngIf="user.projects.length">
        <li *ngFor="let project of user.projects">
          <a [routerLink]="['/project/' + project.project_id]">{{ project.project_name}}</a>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {
  @Input() user: object;

  constructor() {}

  ngOnInit() {}
}
