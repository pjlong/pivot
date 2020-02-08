import { Observable, BehaviorSubject, Subject } from 'rxjs';
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

export interface Person extends BaseElement {
  kind: 'person';
  name: string;
  email: string;
  initials: string;
  username: string;
}

export abstract class BaseResource<T = any> {
  readonly model$: Observable<T>;
  protected data$: Subject<T> | BehaviorSubject<T> = new BehaviorSubject<T>(
    null
  );

  constructor() {
    this.model$ = this.data$
      .asObservable()
      .pipe(filter(response => response !== null));
  }
}
