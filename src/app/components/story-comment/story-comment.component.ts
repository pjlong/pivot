import { Component, Input } from '@angular/core';

import { StoryCommentResponse } from '@app/resources/story-comments.service';

@Component({
  selector: 'pt-story-comment',
  templateUrl: './story-comment.component.html',
  styleUrls: ['./story-comment.component.scss'],
})
export class StoryCommentComponent {
  @Input() comment: StoryCommentResponse;

  constructor() {}
}
