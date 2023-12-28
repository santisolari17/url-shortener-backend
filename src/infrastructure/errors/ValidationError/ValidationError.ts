import { ExceptionError } from '../ExceptionError/ExceptionError';
import { ExtendableError } from '../ExtendableError';

export class ValidationError extends ExtendableError {
  public readonly validationErrorsString: string[] = [];
  public aver = 'veamos';
  constructor(public errors: ExceptionError[], public validationMessage?: string) {
    super(validationMessage ? validationMessage : 'Service call did not pass one or many validations');
    errors.forEach(e => console.error(`resource: [${e.resource}] - code: [${e.code}] message: [${e.message}]`));
    errors.forEach(e =>
      this.validationErrorsString.push(`resource: [${e.resource}] - code: [${e.code}] message: [${e.message}]`),
    );
  }
}
