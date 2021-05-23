import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  IRatingValueObjectNotation,
} from '../../../models';
import { ratingReporter } from '../../reporters';
import { extractRatingStatistics } from '../../statisticsExtractors';

export interface IStringRatingStatistics {
  [key: string]: number;
}

export interface IStringRatingParams extends IBaseStatisticsCalculatorParams {
  valuesNumber?: number;
}

export class StringRatingStatisticsCalculator implements IStatisticsCalculator {
  private statistics: IStringRatingStatistics = {};

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = chunk[this.params.fieldName];

    if (fieldValue == null) {
      throw new TypeError(`Value for field ${this.params.fieldName} is not defined`);
    }

    this.statistics[fieldValue] ? this.statistics[fieldValue]++ : (this.statistics[fieldValue] = 1);
  }

  public getStatisticsInObjectNotation(): IRatingValueObjectNotation {
    return {
      [this.params.fieldName]: {
        [FelixStatisticalType.StringRating]: extractRatingStatistics(this.statistics, this.params),
      },
    };
  }

  public getStatisticsInStringNotation(): string {
    return ratingReporter(FelixStatisticalType.StringRating, this.params.fieldName, this.statistics);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
