import { ID } from '@datorama/akita';

import { PtElement } from '@app/resources';
import { LabelResponse } from '@app/resources/epic.service';
import { PersonResponse } from '@app/resources/project-memberships.service';
import { StoryCommentResponse } from '@app/resources/story-comments.service';
import { StoryTaskResponse } from '@app/resources/story-tasks.service';

export interface Story extends PtElement {
  _id: ID;
  kind: 'story';
  story_type: 'bug' | 'feature' | 'chore' | 'release';
  name: string;
  description: string;
  current_state: string;
  requested_by: PersonResponse;
  requested_by_id: number;
  url: string;
  owner_ids: number[];
  owners: PersonResponse[];
  labels: LabelResponse[];
  estimate: number;
  tasks: StoryTaskResponse[];
  comments: StoryCommentResponse[];

  // Non API properties
  requester: PersonResponse;
  story_comments?: StoryCommentResponse[];
  story_tasks?: StoryTaskResponse[];
}

export const createStory = (params: Partial<Story>): Story => {
  return {} as Story;
};
