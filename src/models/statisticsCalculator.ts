import { IRequestedStatisticsItemOptions } from './felixStatisticalTypes';

export interface IBaseStatisticsCalculatorParams extends IRequestedStatisticsItemOptions {
  fieldName: string;
}

export interface ISingleValueObjectNotation {
  [fieldName: string]: { [statisticsType: string]: string | number };
}

export interface IRatingValueObjectNotation {
  [fieldName: string]: { [statisticsType: string]: { [key: string]: number | string } };
}

export interface IStatisticsCalculator {
  processChunk(chunk: any): void;
  getStatisticsInObjectNotation(): ISingleValueObjectNotation | IRatingValueObjectNotation;
  getStatisticsInStringNotation(): string;
  getFieldName(): string;
}
