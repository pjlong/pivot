import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pt-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.scss']
})
export class ProjectNavComponent implements OnInit {
  @Input() activeTab: string;
  @Input() linkRoot = '..';

  constructor() { }

  ngOnInit() {
  }

}
