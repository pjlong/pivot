import { Component, Input } from '@angular/core';

@Component({
  selector: 'pt-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  @Input() user: object;
}
