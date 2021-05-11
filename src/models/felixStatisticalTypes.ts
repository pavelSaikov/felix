import { FelixType } from './felixTypes';

export enum FelixStatisticalType {
  mean = 'Mean',
  max = 'Max',
  min = 'Min',
  numberRating = 'Number Rating',
  stringRating = 'String Rating',
  keyWord = 'Key Word',
  integerRating = 'Integer Rating',
  hour = 'Hour',
  weekDay = 'Week Day',
  date = 'Date',
  month = 'Month',
  year = 'Year',
}

export const FelixStatisticalTypes = [
  FelixStatisticalType.mean,
  FelixStatisticalType.max,
  FelixStatisticalType.min,
  FelixStatisticalType.numberRating,
  FelixStatisticalType.integerRating,
  FelixStatisticalType.stringRating,
  FelixStatisticalType.keyWord,
  FelixStatisticalType.hour,
  FelixStatisticalType.weekDay,
  FelixStatisticalType.date,
  FelixStatisticalType.month,
  FelixStatisticalType.year,
];

export const DataTypeAndAvailableStatisticalTypeMap = new Map<FelixType | string, FelixStatisticalType[]>([
  [
    FelixType.Number,
    [
      FelixStatisticalType.mean,
      FelixStatisticalType.max,
      FelixStatisticalType.min,
      FelixStatisticalType.numberRating,
      FelixStatisticalType.integerRating,
    ],
  ],
  [FelixType.String, [FelixStatisticalType.keyWord, FelixStatisticalType.stringRating]],
  [
    FelixStatisticalType.date,
    [
      FelixStatisticalType.hour,
      FelixStatisticalType.weekDay,
      FelixStatisticalType.date,
      FelixStatisticalType.month,
      FelixStatisticalType.year,
    ],
  ],
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
