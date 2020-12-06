import { FelixStatisticalType, IStatisticsCalculator } from '../../models';
import { calculateMax } from './calculateMax';
import { calculateMean } from './calculateMean';
import { calculateMin } from './calculateMin';
import { calculateRating } from './calculateRating';

export const statisticsCalculatorsStatisticalTypesMap = new Map<FelixStatisticalType, IStatisticsCalculator>([
  [FelixStatisticalType.mean, calculateMean],
  [FelixStatisticalType.max, calculateMax],
  [FelixStatisticalType.min, calculateMin],
  [FelixStatisticalType.rating, calculateRating],
]);
