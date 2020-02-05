import { Component, Input } from '@angular/core';

import { MeResponse } from '@app/resources/me.service';

@Component({
  selector: 'pt-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  @Input() user: MeResponse;
}
