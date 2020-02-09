import { Component, Input } from '@angular/core';

import { Person } from '@app/resources';

@Component({
  selector: 'pt-person-badge',
  templateUrl: './person-badge.component.html',
  styleUrls: ['./person-badge.component.scss'],
})
export class PersonBadgeComponent {
  @Input() person: Person;
}
