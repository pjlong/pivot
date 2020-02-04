import { Observable, BehaviorSubject } from 'rxjs';

export const storiesMockService = {
  model$: new Observable(),
  data$: new BehaviorSubject(null),
  get: jest.fn(),
};
