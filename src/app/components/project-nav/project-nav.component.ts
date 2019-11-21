import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pt-project-nav',
  template: `
    <nav class="navbar navbar-dark navbar-expand-sm bg-dark">
      <a class="navbar-brand text-light">Pivot</a>
      <div class="nav-collapse collapse show">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" [class.active]="activeTab === 'board'">
            <a class="nav-link"[routerLink]="[linkRoot + '/board']">Board</a>
          </li>
          <li class="nav-item" [class.active]="activeTab === 'epics'">
            <a class="nav-link" [routerLink]="[linkRoot + '/epics']">Epics</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  @Input() activeTab: string;
  @Input() linkRoot = '..';

  constructor() { }

  ngOnInit() {
  }

}
