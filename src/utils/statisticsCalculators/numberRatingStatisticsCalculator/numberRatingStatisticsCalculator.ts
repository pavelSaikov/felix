import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  IRatingValueObjectNotation,
} from '../../../models';
import { parseNumber } from '../parseNumber';
import { ratingReporter } from '../../reporters';
import { extractRatingStatistics } from '../../statisticsExtractors';
import { isNumber } from '../../validators';

export interface INumberRatingStatistics {
  [key: string]: number;
}

export interface INumberRatingParams extends IBaseStatisticsCalculatorParams {
  valuesNumber?: number;
}

export class NumberRatingStatisticsCalculator implements IStatisticsCalculator {
  private statistics: INumberRatingStatistics = {};

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = parseNumber(chunk[this.params.fieldName]);
    isNumber(this.params.fieldName, fieldValue);

    this.statistics[fieldValue] ? this.statistics[fieldValue]++ : (this.statistics[fieldValue] = 1);
  }

  public getStatisticsInObjectNotation(): IRatingValueObjectNotation {
    return {
      [this.params.fieldName]: {
        [FelixStatisticalType.numberRating]: extractRatingStatistics(this.statistics, this.params),
      },
    };
  }

  public getStatisticsInStringNotation(): string {
    return ratingReporter(FelixStatisticalType.numberRating, this.params.fieldName, this.statistics);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
