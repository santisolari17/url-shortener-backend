export const I_NOSQL_STORE = Symbol('I_NOSQL_STORE');

export interface INosqlStore {
  findOne(collection: string, id: string);
  findByPropertyEquality(collection: string, propertyName: string, propertyValue: any): Promise<any>;
  getAll<T>(collection: string): Promise<T[]>;
  put<T>(collection: string, data: any): Promise<T[]>;
  delete(collection: string, ids: string[]);
}
