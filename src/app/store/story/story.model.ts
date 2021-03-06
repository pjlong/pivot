import { PtElement, BaseElement, Person } from '@app/resources';

import { Label } from '../epic';

export interface FileAttachment extends BaseElement {
  kind: 'file_attachment';
  filename: string;
  created_at: string;
  uploader_id: number;
  thumbnailable: boolean;
  height: number;
  width: number;
  size: number;
  download_url: string;
  content_type: string;
  uploaded: boolean;
  big_url: string;
  thumbnail_url: string;
}

export interface Comment extends BaseElement {
  kind: 'comment';
  story_id: number;
  epic_id: number;
  text: string;
  person_id: number;
  created_at: string;
  updated_at: string;
  file_attachments?: FileAttachment[];
  commit_identifier: string;
  commit_type: string;
  person?: Person;
}

export interface Task extends BaseElement {
  kind: 'task';
  story_id: number;
  description: string;
  complete: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Story extends PtElement {
  kind: 'story';
  name: string;
  story_type: 'bug' | 'feature' | 'chore' | 'release';
  current_state: StoryStateName;
  estimate: number;
  url: string;
  owners: Person[];
  requested_by: Person;
  labels: Label[];

  description?: string;

  tasks?: Task[];
  comments?: Comment[];
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

export interface StoriesGroupedByOwner {
  [key: string]: {
    [key: string]: any;
  };
}

export const createStory = (params: Partial<Story>): Story => {
  return {} as Story;
};
