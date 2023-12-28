import { Injectable } from '@nestjs/common';
import { validate, ValidationError as ClassValidatorError } from 'class-validator';
import { forIn } from 'lodash';
import { ExceptionError } from '../../../../infrastructure/errors/ExceptionError/ExceptionError';
import { ValidationError } from '../../../../infrastructure/errors/ValidationError/ValidationError';
import { IClassEntityValidator } from '../interfaces/IClassEntityValidator';

@Injectable()
export class ClassValidatorImp implements IClassEntityValidator {
  public async validate(classValidatorEntity: any) {
    const validationResults = await validate(classValidatorEntity);

    if (validationResults.length > 0) {
      const entityType = classValidatorEntity.constructor.name;
      const errors = this._extractErrors(validationResults, entityType);
      throw new ValidationError(errors, `Entity of type ${entityType} is not a valid entity of that type.`);
    }
  }

  private _extractErrors(validationErrors: ClassValidatorError[], resource: string, parentPropertyName?: string) {
    const errors: ExceptionError[] = [];

    for (const vr of validationErrors) {
      if (vr.constraints) {
        forIn(vr.constraints, (message, type) => {
          const code = parentPropertyName ? `${parentPropertyName}_${vr.property}_${type}` : `${vr.property}_${type}`;
          errors.push(new ExceptionError(resource, code, message));
        });
      }

      if (vr.children && vr.children.length > 0) {
        const errorCode = parentPropertyName ? `${parentPropertyName}_${vr.property}` : `${vr.property}`;
        const childrenErrors = this._extractErrors(vr.children, resource, errorCode);
        if (childrenErrors.length > 0) {
          errors.push(...childrenErrors);
        }
      }
    }

    return errors;
  }
}
