import { Observable, BehaviorSubject } from 'rxjs';

export const meMockService = {
  model$: new Observable(null),
  data$: new BehaviorSubject(null),
  get: jest.fn(),
};
