import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  ISingleValueObjectNotation,
} from '../../../models';
import { parseNumber } from '../parseNumber';
import { singleValueReporter } from '../../reporters';
import { isNumber } from '../../validators';

export interface IMaxStatistics {
  max: number;
}

export class MaxNumberStatisticsCalculator implements IStatisticsCalculator {
  private statistics: IMaxStatistics;

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = parseNumber(chunk[this.params.fieldName]);
    isNumber(this.params.fieldName, fieldValue);

    if (!this.statistics) {
      this.statistics = { max: fieldValue };
      return;
    }

    this.statistics.max = Math.max(this.statistics.max, fieldValue);
  }

  public getStatisticsInObjectNotation(): ISingleValueObjectNotation {
    return { [this.params.fieldName]: { [FelixStatisticalType.max]: this.statistics.max } };
  }

  public getStatisticsInStringNotation(): string {
    return singleValueReporter(FelixStatisticalType.max, this.params.fieldName, this.statistics.max);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
