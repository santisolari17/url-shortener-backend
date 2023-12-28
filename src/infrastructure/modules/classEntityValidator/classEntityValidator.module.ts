import { Module } from '@nestjs/common';
import { ClassValidatorImp } from './implementations/ClassValidatorImp';
import { I_CLASS_ENTITY_VALIDATOR } from './interfaces/IClassEntityValidator';

export const CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER = {
  useClass: ClassValidatorImp,
  provide: I_CLASS_ENTITY_VALIDATOR,
};

@Module({
  providers: [CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER],
  exports: [CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER],
})
export class ClassEntityValidatorModule {}
