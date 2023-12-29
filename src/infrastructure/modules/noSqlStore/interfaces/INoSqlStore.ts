import { QueryPropertyFilter } from '../types/QueryPropertyFilter.type';

export const I_NOSQL_STORE = Symbol('I_NOSQL_STORE');

export interface INosqlStore {
  findOne(collection: string, id: string);
  findBy(collection: string, filter: QueryPropertyFilter): Promise<any>;
  getAll<T>(collection: string): Promise<T[]>;
  put<T>(collection: string, data: T): Promise<void>;
  delete(collection: string, ids: string[]);
}
