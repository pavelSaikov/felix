import { FelixStatisticalType, IRatingMap, IRequestedStatisticsItemOptions } from '../../models';
import { ICalculateMaxParams } from '../statisticsCalculators/calculateMax';
import { ICalculateMeanParams } from '../statisticsCalculators/calculateMean';
import { ICalculateMinParams } from '../statisticsCalculators/calculateMin';
import { ICalculateRatingParams } from '../statisticsCalculators/calculateRating';
import { statisticalTypeStatisticsExtractorMap } from '../statisticsExtractors';
import { ratingReporter } from './ratingReporter';
import { singleValueReporterFactory } from './singleValueReporterFactory';

export const statisticalParamStatisticalReporterMap = new Map<
  FelixStatisticalType,
  (fieldName: string, statisticsParams: { [key: string]: any }, options?: IRequestedStatisticsItemOptions) => string
>([
  [
    FelixStatisticalType.mean,
    (fieldName: string, statisticsParams: ICalculateMeanParams) =>
      singleValueReporterFactory(
        fieldName,
        FelixStatisticalType.mean,
        statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.mean)(statisticsParams) as string | number,
      ),
  ],
  [
    FelixStatisticalType.max,
    (fieldName: string, statisticsParams: ICalculateMaxParams) =>
      singleValueReporterFactory(
        fieldName,
        FelixStatisticalType.max,
        statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.max)(statisticsParams) as string | number,
      ),
  ],
  [
    FelixStatisticalType.min,
    (fieldName: string, statisticsParams: ICalculateMinParams) =>
      singleValueReporterFactory(
        fieldName,
        FelixStatisticalType.min,
        statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.min)(statisticsParams) as string | number,
      ),
  ],
  [
    FelixStatisticalType.rating,
    (fieldName: string, statisticsParams: ICalculateRatingParams, options?: IRequestedStatisticsItemOptions) =>
      ratingReporter(
        'Standard',
        fieldName,
        statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)(statisticsParams, options) as IRatingMap,
      ),
  ],
  [
    FelixStatisticalType.integerRating,
    (fieldName: string, statisticsParams: ICalculateRatingParams, options?: IRequestedStatisticsItemOptions) =>
      ratingReporter(
        'Number',
        fieldName,
        statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)(
          statisticsParams,
          options,
        ) as IRatingMap,
      ),
  ],
]);
