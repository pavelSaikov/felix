import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  IRatingValueObjectNotation,
} from '../../../models';
import { parseNumber } from '../parseNumber';
import { ratingReporter } from '../../reporters';
import { extractRatingStatistics } from '../../statisticsExtractors';

export interface IIntegerRatingStatistics {
  [key: string]: number;
}

export interface IIntegerRatingParams extends IBaseStatisticsCalculatorParams {
  valuesNumber?: number;
}

export class IntegerRatingStatisticsCalculator implements IStatisticsCalculator {
  private statistics: IIntegerRatingStatistics = {};

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = parseNumber(chunk[this.params.fieldName]);

    if (fieldValue === null || fieldValue === undefined) {
      throw new TypeError(`Value for field ${this.params.fieldName} is not defined`);
    }

    const roundedFieldValue = Math.round(fieldValue);

    this.statistics[roundedFieldValue]
      ? this.statistics[roundedFieldValue]++
      : (this.statistics[roundedFieldValue] = 1);
  }

  public getStatisticsInObjectNotation(): IRatingValueObjectNotation {
    return {
      [this.params.fieldName]: {
        [FelixStatisticalType.IntegerRating]: extractRatingStatistics(this.statistics, this.params),
      },
    };
  }

  public getStatisticsInStringNotation(): string {
    return ratingReporter(FelixStatisticalType.NumberRating, this.params.fieldName, this.statistics);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
