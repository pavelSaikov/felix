import { FelixGroupingType } from '../../models';
import {
  extractDate,
  extractHours,
  extractMonth,
  extractMonthDay,
  extractWeekDay,
  extractYear,
} from '../valueExtractors';

export const groupingTypeValueExtractorMap = new Map<FelixGroupingType, (args: any) => string | number>([
  [FelixGroupingType.Number, (value: number) => value],
  [FelixGroupingType.Integer, (value: number) => Math.round(value)],
  [FelixGroupingType.KeyWord, (value: string) => value],
  [FelixGroupingType.Date, (value: string) => extractDate(value)],
  [FelixGroupingType.Hour, (value: string) => extractHours(value)],
  [FelixGroupingType.Month, (value: string) => extractMonth(value)],
  [FelixGroupingType.MonthDay, (value: string) => extractMonthDay(value)],
  [FelixGroupingType.WeekDay, (value: string) => extractWeekDay(value)],
  [FelixGroupingType.Year, (value: string) => extractYear(value)],
]);
