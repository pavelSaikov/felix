import {
  IStatisticsCalculator,
  IBaseStatisticsCalculatorParams,
  FelixStatisticalType,
  ISingleValueObjectNotation,
} from '../../../models';
import { parseNumber } from '../parseNumber';
import { singleValueReporter } from '../../reporters';

export interface IMeanStatistics {
  mean: number;
  elementsNumber: number;
}

export class MeanNumberStatisticsCalculator implements IStatisticsCalculator {
  private statistics: IMeanStatistics = { mean: 0, elementsNumber: 0 };

  constructor(private params: IBaseStatisticsCalculatorParams) {}

  public processChunk(chunk: any): void {
    const fieldValue = parseNumber(chunk[this.params.fieldName]);
    if (isNaN(fieldValue)) {
      throw new TypeError(
        `Field ${this.params.fieldName} is not a number. Cortege number - ${this.statistics.elementsNumber + 1}`,
      );
    }

    const newElementsNumber = this.statistics.elementsNumber + 1;
    this.statistics.mean = (this.statistics.mean * this.statistics.elementsNumber + fieldValue) / newElementsNumber;
    this.statistics.elementsNumber = newElementsNumber;
  }

  public getStatisticsInObjectNotation(): ISingleValueObjectNotation {
    return { [this.params.fieldName]: { [FelixStatisticalType.mean]: this.statistics.mean } };
  }

  public getStatisticsInStringNotation(): string {
    return singleValueReporter(FelixStatisticalType.mean, this.params.fieldName, this.statistics.mean);
  }

  public getFieldName(): string {
    return this.params.fieldName;
  }
}
