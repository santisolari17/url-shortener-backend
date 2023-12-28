import { CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER } from '../modules/classEntityValidator/classEntityValidator.module';

const _entityValidator = new CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER.useClass();

/**
 * If a class method receives one or many class-validator decorated params, this decorator will run the validation
 * on those objects and throw an error if the validation on any of them fails.
 */
export function ValidateEntityParams(): (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (const arg of args) {
        await _entityValidator.validate(arg);
      }

      const result: any = await method.apply(this, args);

      return result;
    };

    return descriptor;
  };
}
