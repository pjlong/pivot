import { Component, Input } from '@angular/core';

@Component({
  selector: 'pt-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss'],
})
export class ProjectNavComponent {
  @Input() linkRoot = '..';
}
