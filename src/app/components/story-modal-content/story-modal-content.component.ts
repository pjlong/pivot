import { Component, Input, OnInit } from '@angular/core';

import { StoryResponse } from '@app/resources/stories.service';

@Component({
  selector: 'pt-story-modal-content',
  templateUrl: './story-modal-content.component.html',
  styleUrls: ['./story-modal-content.component.scss']
})
export class StoryModalContentComponent implements OnInit {
  @Input() story: StoryResponse;

  constructor() {}

  ngOnInit() {}
}
