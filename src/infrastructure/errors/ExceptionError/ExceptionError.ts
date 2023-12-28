import { ExtendableError } from '../ExtendableError';

export class ExceptionError extends ExtendableError {
  constructor(public resource: string, public code: string, public message: string) {
    super(message);
  }
}
