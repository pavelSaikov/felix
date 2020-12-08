import { FelixStatisticalType, IRequestedStatisticsItemOptions } from '../../models';
import { ICalculateMaxParams } from '../statisticsCalculators/calculateMax';
import { ICalculateMeanParams } from '../statisticsCalculators/calculateMean';
import { ICalculateMinParams } from '../statisticsCalculators/calculateMin';
import { extractRatingStatistics } from './extractRatingStatistics';

export const statisticalTypeStatisticsExtractorMap = new Map<
  FelixStatisticalType,
  (params: any, options?: IRequestedStatisticsItemOptions) => number | { [key: string]: number | string }
>([
  [FelixStatisticalType.mean, (params: ICalculateMeanParams) => params.mean],
  [FelixStatisticalType.min, (params: ICalculateMinParams) => params.min],
  [FelixStatisticalType.max, (params: ICalculateMaxParams) => params.max],
  [FelixStatisticalType.rating, extractRatingStatistics],
  [FelixStatisticalType.integerRating, extractRatingStatistics],
]);
