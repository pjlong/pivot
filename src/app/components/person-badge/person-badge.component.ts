import { Component, Input } from '@angular/core';

import { PersonResponse } from '@app/resources/project-memberships.service';

@Component({
  selector: 'pt-person-badge',
  templateUrl: './person-badge.component.html',
  styleUrls: ['./person-badge.component.scss'],
})
export class PersonBadgeComponent {
  @Input() person: PersonResponse;
}
