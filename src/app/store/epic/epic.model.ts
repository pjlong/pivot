import { PtElement } from '@app/resources';
import { PersonResponse } from '@app/resources/project-memberships.service';

export interface Label extends PtElement {
  kind: 'label';
  name: string;
}

export interface Epic extends PtElement {
  kind: 'epic';
  name: string;
  description: string;
  label: Label;
  url: string;

  followers?: PersonResponse[];
}

export const createEpic = (params: Partial<Epic>): Epic => {
  return {} as Epic;
};
