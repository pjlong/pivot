import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pt-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {
  @Input() user: object;

  constructor() {}

  ngOnInit() {}
}
