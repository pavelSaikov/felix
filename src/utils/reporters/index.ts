import { FelixStatisticalType, IRequestedStatisticsItemOptions } from '../../models';
import { ICalculateMaxParams } from '../statisticsCalculators/calculateMax';
import { ICalculateMeanParams } from '../statisticsCalculators/calculateMean';
import { ICalculateMinParams } from '../statisticsCalculators/calculateMin';
import { ICalculateRatingParams } from '../statisticsCalculators/calculateRating';
import { ratingReporter } from './ratingReporter';
import { singleValueReporterFactory } from './singleValueReporterFactory';

export const statisticalParamStatisticalReporterMap = new Map<
  FelixStatisticalType,
  (fieldName: string, statisticsParams: { [key: string]: any }, options?: IRequestedStatisticsItemOptions) => string
>([
  [
    FelixStatisticalType.mean,
    (fieldName: string, statisticsParams: ICalculateMeanParams) =>
      singleValueReporterFactory(fieldName, FelixStatisticalType.mean, statisticsParams.mean),
  ],
  [
    FelixStatisticalType.max,
    (fieldName: string, statisticsParams: ICalculateMaxParams) =>
      singleValueReporterFactory(fieldName, FelixStatisticalType.max, statisticsParams.max),
  ],
  [
    FelixStatisticalType.min,
    (fieldName: string, statisticsParams: ICalculateMinParams) =>
      singleValueReporterFactory(fieldName, FelixStatisticalType.min, statisticsParams.min),
  ],
  [
    FelixStatisticalType.rating,
    (fieldName: string, statisticsParams: ICalculateRatingParams, options: IRequestedStatisticsItemOptions) =>
      ratingReporter('Standard', fieldName, FelixStatisticalType.rating, statisticsParams, options),
  ],
]);
