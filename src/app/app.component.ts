import { Component, OnInit } from '@angular/core';

import { MeService } from './resources/me.service';

@Component({
  selector: 'pt-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pivot';
  me: any;

  constructor(
    private meService: MeService
  ) {}

  ngOnInit() {}
}
