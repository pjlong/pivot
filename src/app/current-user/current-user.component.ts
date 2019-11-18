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
          <span>{{ project.project_name}}</span>
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
