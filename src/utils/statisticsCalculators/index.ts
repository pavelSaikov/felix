import { FelixStatisticalType, IBaseStatisticsCalculatorParams, IStatisticsCalculator } from '../../models';
import { IntegerRatingStatisticsCalculator } from './integerRatingStatisticsCalculator';
import { MeanNumberStatisticsCalculator } from './meanNumberStatisticsCalculator';
import { MaxNumberStatisticsCalculator } from './maxNumberStatisticsCalculator';
import { MinNumberStatisticsCalculator } from './minNumberStatisticsCalculator';
import { NumberRatingStatisticsCalculator } from './numberRatingStatisticsCalculator';
import { StringRatingStatisticsCalculator } from './stringRatingStatisticsCalculator';

type StatisticalCalculatorFactory = (params: IBaseStatisticsCalculatorParams) => IStatisticsCalculator;

export const statisticsCalculatorFactoriesStatisticalTypesMap = new Map<
  FelixStatisticalType,
  StatisticalCalculatorFactory
>([
  [FelixStatisticalType.Mean, (params: IBaseStatisticsCalculatorParams) => new MeanNumberStatisticsCalculator(params)],
  [FelixStatisticalType.Max, (params: IBaseStatisticsCalculatorParams) => new MaxNumberStatisticsCalculator(params)],
  [FelixStatisticalType.Min, (params: IBaseStatisticsCalculatorParams) => new MinNumberStatisticsCalculator(params)],
  [
    FelixStatisticalType.NumberRating,
    (params: IBaseStatisticsCalculatorParams) => new NumberRatingStatisticsCalculator(params),
  ],
  [
    FelixStatisticalType.IntegerRating,
    (params: IBaseStatisticsCalculatorParams) => new IntegerRatingStatisticsCalculator(params),
  ],
  [
    FelixStatisticalType.StringRating,
    (params: IBaseStatisticsCalculatorParams) => new StringRatingStatisticsCalculator(params),
  ],
]);
