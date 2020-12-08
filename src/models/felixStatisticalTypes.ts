import { FelixType } from './felixTypes';

export enum FelixStatisticalType {
  mean = 'Mean',
  max = 'Max',
  min = 'Min',
  rating = 'Rating',
  integerRating = 'Integer Rating', // create rating from rounded numbers
}

export const FelixStatisticalTypes = [
  FelixStatisticalType.mean,
  FelixStatisticalType.max,
  FelixStatisticalType.min,
  FelixStatisticalType.rating,
  FelixStatisticalType.integerRating,
];

export const DataTypeAndAvailableStatisticalTypeMap = new Map<FelixType | string, FelixStatisticalType[]>([
  [
    FelixType.Number,
    [
      FelixStatisticalType.mean,
      FelixStatisticalType.max,
      FelixStatisticalType.min,
      FelixStatisticalType.rating,
      FelixStatisticalType.integerRating,
    ],
  ],
  [FelixType.String, [FelixStatisticalType.rating]],
]);

export interface IRatingMap {
  [key: string]: number;
}

export interface IRequestedStatisticsItemOptions {
  [key: string]: string | number | boolean;
}

export interface IRequestedStatisticsItem {
  fieldName: string;
  statisticalType: FelixStatisticalType;
  options: IRequestedStatisticsItemOptions;
}

export interface IObjectReport {
  [key: string]: number | string | IObjectReport;
}

export interface IStatisticalData {
  [fieldName: string]: {
    [statisticalType: string]: any;
  };
}
