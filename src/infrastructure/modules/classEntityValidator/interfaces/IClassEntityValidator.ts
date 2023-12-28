export const I_CLASS_ENTITY_VALIDATOR = Symbol('I_CLASS_ENTITY_VALIDATOR');

export interface IClassEntityValidator {
  validate(classInstance: any): Promise<void>;
}
