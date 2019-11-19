
export interface BaseElement {
  id: string;
  kind: string;
}

export interface PtElement extends BaseElement {
  project_id: string | number;
  created_at: string;
  updated_at: string;
}
