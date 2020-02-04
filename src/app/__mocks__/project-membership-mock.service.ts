import { Observable, BehaviorSubject } from 'rxjs';

export const projectMembershipMockService = {
  model$: new Observable(),
  data$: new BehaviorSubject(null),
  get: jest.fn(),
};
