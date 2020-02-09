import { PtElement } from '@app/resources';

export interface Project extends PtElement {
  kind: 'project';
  name: string;
  status: string;
  description: string;
  profile_content: string;
  iteration_length: number;
  week_start_day: string;
  point_scale: string;
  bugs_and_chores_are_estimatable: boolean;

  // Non-default
  current_iteration_number: number;
  current_velocity: number;
  current_volatility: number;
  story_ids: number[];
  epic_ids: number[];
  membership_ids: number[];
}

export const createProject = (params: Partial<Project>): Project => {
  return {} as Project;
};
