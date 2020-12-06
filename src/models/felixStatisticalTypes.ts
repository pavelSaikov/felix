import { FelixType } from './felixTypes';

export enum FelixStatisticalType {
  mean = 'Mean',
  max = 'Max',
  min = 'Min',
  rating = 'Rating',
  numberRating = 'Number rating', // create rating from rounded numbers
}

export const FelixStatisticalTypes = [
  FelixStatisticalType.mean,
  FelixStatisticalType.max,
  FelixStatisticalType.min,
  FelixStatisticalType.rating,
];

export const DataTypeAndAvailableStatisticalTypeMap = new Map<FelixType | string, FelixStatisticalType[]>([
  [
    FelixType.Number,
    [
      FelixStatisticalType.mean,
      FelixStatisticalType.max,
      FelixStatisticalType.min,
      FelixStatisticalType.rating,
      FelixStatisticalType.numberRating,
    ],
  ],
  [FelixType.String, [FelixStatisticalType.rating]],
]);

export interface IRequestedStatisticsItemOptions {
  [key: string]: string | number | boolean;
}

export interface IRequestedStatisticsItem {
  fieldName: string;
  statisticalType: FelixStatisticalType;
  options: IRequestedStatisticsItemOptions;
}

export interface IStatisticalData {
  [fieldName: string]: {
    [statisticalType: string]: any;
  };
}
