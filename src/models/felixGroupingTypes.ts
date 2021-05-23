import { FelixType } from './felixTypes';

export enum FelixGroupingType {
  Number = 'Number',
  Integer = 'Integer',
  KeyWord = 'Key Word',
  Hour = 'Hour',
  WeekDay = 'Week Day',
  MonthDay = 'Month Day',
  Date = 'Date',
  Month = 'Month',
  Year = 'Year',
}

export const FelixGroupingTypes = [
  FelixGroupingType.Date,
  FelixGroupingType.Hour,
  FelixGroupingType.Integer,
  FelixGroupingType.KeyWord,
  FelixGroupingType.Month,
  FelixGroupingType.MonthDay,
  FelixGroupingType.Number,
  FelixGroupingType.WeekDay,
  FelixGroupingType.Year,
];

export const DataTypeAndAvailableGroupingTypeMap = new Map<FelixType, FelixGroupingType[]>([
  [FelixType.Number, [FelixGroupingType.Number, FelixGroupingType.Integer]],
  [
    FelixType.Date,
    [
      FelixGroupingType.Hour,
      FelixGroupingType.WeekDay,
      FelixGroupingType.MonthDay,
      FelixGroupingType.Date,
      FelixGroupingType.Month,
      FelixGroupingType.Year,
    ],
  ],
  [FelixType.String, [FelixGroupingType.KeyWord]],
]);

export interface IFieldGrouping {
  fieldName: string;
  groupingType: FelixGroupingType;
}
