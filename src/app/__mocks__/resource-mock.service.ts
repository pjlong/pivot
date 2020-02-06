import { Observable, BehaviorSubject } from 'rxjs';

//** Mock service for all API services that extends `BaseResource` */
export class ResourceMockService {
  model$ = new Observable();
  data$ = new BehaviorSubject(null);
  get = jest.fn();
  post = jest.fn();
}
