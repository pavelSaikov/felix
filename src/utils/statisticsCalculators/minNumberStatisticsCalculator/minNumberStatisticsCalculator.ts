import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  ISingleValueObjectNotation,
} from '../../../models';
import { parseNumber } from '../parseNumber';
import { singleValueReporter } from '../../reporters';
import { isNumber } from '../../validators';

export interface IMinStatistics {
  min: number;
}

export class MinNumberStatisticsCalculator implements IStatisticsCalculator {
  private statistics: IMinStatistics;

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = parseNumber(chunk[this.params.fieldName]);
    isNumber(this.params.fieldName, fieldValue);

    if (!this.statistics) {
      this.statistics = { min: fieldValue };
      return;
    }

    this.statistics.min = Math.min(this.statistics.min, fieldValue);
  }

  public getStatisticsInObjectNotation(): ISingleValueObjectNotation {
    return { [this.params.fieldName]: { [FelixStatisticalType.min]: this.statistics.min } };
  }

  public getStatisticsInStringNotation(): string {
    return singleValueReporter(FelixStatisticalType.min, this.params.fieldName, this.statistics.min);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
