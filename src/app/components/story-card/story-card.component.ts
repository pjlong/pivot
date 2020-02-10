import { Component, OnInit, Input } from '@angular/core';

import { Story } from '@app/store/story';

@Component({
  selector: 'pt-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
  @Input() story: Story;

  constructor() {}

  ngOnInit() {}
}
