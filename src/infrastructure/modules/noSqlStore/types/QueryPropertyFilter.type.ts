import { ENoSqlQueryOperators } from '../enums/ENoSqlQueryOperators';

export type QueryPropertyFilter = {
  property: string;
  queryOperator: ENoSqlQueryOperators;
  value: string | number;
  propertyIndexName?: string;
};
