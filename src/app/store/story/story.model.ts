import { ID } from '@datorama/akita';

import { PtElement } from '@app/resources';
import { LabelResponse } from '@app/resources/epic.service';
import { PersonResponse } from '@app/resources/project-memberships.service';
import { StoryCommentResponse } from '@app/resources/story-comments.service';
import { StoryTaskResponse } from '@app/resources/story-tasks.service';

export interface Story extends PtElement {
  kind: 'story';
  name: string;
  story_type: 'bug' | 'feature' | 'chore' | 'release';
  current_state: StoryStateName;
  estimate: number;
  url: string;
  owners: PersonResponse[];
  requested_by: PersonResponse;
  labels: LabelResponse[];

  description?: string;

  tasks?: StoryTaskResponse[];
  comments?: StoryCommentResponse[];
}

export type StoryStateName =
  | 'planned'
  | 'unscheduled'
  | 'unstarted'
  | 'started'
  | 'finished'
  | 'delivered'
  | 'accepted';

export type StoriesGroupedByState = { [key in StoryStateName]?: Story[] };

export const createStory = (params: Partial<Story>): Story => {
  return {} as Story;
};
