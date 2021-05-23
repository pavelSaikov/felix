import { FelixType } from './felixTypes';

export enum FelixStatisticalType {
  Mean = 'Mean',
  Max = 'Max',
  Min = 'Min',
  NumberRating = 'Number Rating',
  StringRating = 'String Rating',
  KeyWord = 'Key Word',
  IntegerRating = 'Integer Rating',
  Hour = 'Hour',
  WeekDay = 'Week Day',
  Date = 'Date',
  Month = 'Month',
  Year = 'Year',
}

export const FelixStatisticalTypes = [
  FelixStatisticalType.Mean,
  FelixStatisticalType.Max,
  FelixStatisticalType.Min,
  FelixStatisticalType.NumberRating,
  FelixStatisticalType.IntegerRating,
  FelixStatisticalType.StringRating,
  FelixStatisticalType.KeyWord,
  FelixStatisticalType.Hour,
  FelixStatisticalType.WeekDay,
  FelixStatisticalType.Date,
  FelixStatisticalType.Month,
  FelixStatisticalType.Year,
];

export const DataTypeAndAvailableStatisticalTypeMap = new Map<FelixType | string, FelixStatisticalType[]>([
  [
    FelixType.Number,
    [
      FelixStatisticalType.Mean,
      FelixStatisticalType.Max,
      FelixStatisticalType.Min,
      FelixStatisticalType.NumberRating,
      FelixStatisticalType.IntegerRating,
    ],
  ],
  [FelixType.String, [FelixStatisticalType.KeyWord, FelixStatisticalType.StringRating]],
  [
    FelixStatisticalType.Date,
    [
      FelixStatisticalType.Hour,
      FelixStatisticalType.WeekDay,
      FelixStatisticalType.Date,
      FelixStatisticalType.Month,
      FelixStatisticalType.Year,
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
