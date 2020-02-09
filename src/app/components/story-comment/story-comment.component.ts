import { Component, Input } from '@angular/core';

import { Comment } from '@store/story';

@Component({
  selector: 'pt-story-comment',
  templateUrl: './story-comment.component.html',
  styleUrls: ['./story-comment.component.scss'],
})
export class StoryCommentComponent {
  @Input() comment: Comment;
}
