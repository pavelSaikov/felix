import { FelixType } from './index';

export interface IFields {
  [key: string]: FelixType;
}

export interface IInitialParams {
  fields?: IFields;
  countCorteges?: boolean;
  createReport?: boolean;
}
