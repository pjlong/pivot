import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BaseElement {
  id: string;
  kind: string;
}

export interface PtElement extends BaseElement {
  project_id: string | number;
  created_at: string;
  updated_at: string;
}

export abstract class BaseResource<T = any> {
  readonly model$: Observable<T>;
  protected data$ = new BehaviorSubject<T>(null);

  constructor() {
    this.model$ = this.data$
      .asObservable()
      .pipe(filter(response => response !== null));
  }
}
