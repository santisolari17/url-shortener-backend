import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

export class TestClassValidatorEntity {
  @IsString()
  property1: string;

  @IsNumber()
  property2: number;

  constructor(params: { mustBeString: any; mustBeNumber: any }) {
    this.property1 = params.mustBeString;
    this.property2 = params.mustBeNumber;
  }
}

export class NestedType {
  @IsDate()
  date: Date;

  constructor(date: any) {
    this.date = date;
  }
}

export class TestNestedClassValidatorEntity {
  @IsString()
  property1: string;

  @IsNumber()
  property2: number;

  @ValidateNested()
  nestedProperty: NestedType;

  constructor(params: { mustBeString: any; mustBeNumber: any; mustBeNestedType: any }) {
    this.property1 = params.mustBeString;
    this.property2 = params.mustBeNumber;
    this.nestedProperty = params.mustBeNestedType;
  }
}
