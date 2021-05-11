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
  [FelixStatisticalType.mean, (params: IBaseStatisticsCalculatorParams) => new MeanNumberStatisticsCalculator(params)],
  [FelixStatisticalType.max, (params: IBaseStatisticsCalculatorParams) => new MaxNumberStatisticsCalculator(params)],
  [FelixStatisticalType.min, (params: IBaseStatisticsCalculatorParams) => new MinNumberStatisticsCalculator(params)],
  [
    FelixStatisticalType.numberRating,
    (params: IBaseStatisticsCalculatorParams) => new NumberRatingStatisticsCalculator(params),
  ],
  [
    FelixStatisticalType.integerRating,
    (params: IBaseStatisticsCalculatorParams) => new IntegerRatingStatisticsCalculator(params),
  ],
  [
    FelixStatisticalType.stringRating,
    (params: IBaseStatisticsCalculatorParams) => new StringRatingStatisticsCalculator(params),
  ],
]);
