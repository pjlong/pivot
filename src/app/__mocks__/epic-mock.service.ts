import { Observable } from 'rxjs';

export const epicMockService = {
  model$: new Observable(),
  get: jest.fn(),
};
