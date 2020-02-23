import { Component, Input } from '@angular/core';

import { Project } from '@app/store/project';

@Component({
  selector: 'pt-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project: Project;
}
