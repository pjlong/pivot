import { Component, Input } from '@angular/core';

import { BaseElement } from '@app/resources';
import { Story } from '@app/store/story';

@Component({
  selector: 'pt-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
})
export class StoryDetailsComponent {
  @Input() story: Story;
  @Input() loading: boolean;

  status = {
    description: {
      collapse: false,
    },
    tasks: {
      collapse: false,
    },
    comments: {
      collapse: false,
    },
  };
  projectId: string;

  trackById(resource: BaseElement): string {
    return resource.id;
  }
}
