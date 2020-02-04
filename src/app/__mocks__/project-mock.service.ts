import { Observable } from 'rxjs';

export const projectMockService = {
  model$: new Observable(),
  get: jest.fn(),
};
