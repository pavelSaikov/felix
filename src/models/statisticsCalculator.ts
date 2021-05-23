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

export interface IGrouper {
  processChunk(chunk: any): void;
  getStatisticsInObjectNotation(): ISingleValueObjectNotation | IRatingValueObjectNotation;
  getStatisticsInStringNotation(): string;
}

export interface IStatisticsCalculator extends IGrouper {
  getFieldName(): string;
}
