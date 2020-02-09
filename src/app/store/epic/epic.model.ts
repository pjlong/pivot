import { PtElement, Person } from '@app/resources';

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

  followers?: Person[];
}

export const createEpic = (params: Partial<Epic>): Epic => {
  return {} as Epic;
};
