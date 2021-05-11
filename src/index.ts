import { Transform, TransformCallback } from 'stream';
import _ from 'lodash';

import { StatisticalParamError } from './errors';
import {
  FelixStatisticalType,
  FelixType,
  IChunk,
  IChunkFilter,
  IFields,
  IInitialParams,
  IObjectReport,
  IRequestedStatisticsItemOptions,
  IStatisticsCalculator,
  IUserConsumer,
} from './models';
import {
  checkArgsForAddStatisticalParamMethod,
  checkChunkFilter,
  checkInitialParams,
  checkIsStatisticalTypeAvailableForField,
  checkUserConsumer,
  statisticsCalculatorFactoriesStatisticalTypesMap,
} from './utils';

class Felix extends Transform {
  private readonly initialParams: IInitialParams;
  private readonly fieldTypes: IFields;
  private readonly fieldNames: string[];
  private statisticsCalculators: IStatisticsCalculator[];
  private cortegesNumber: number;
  private userConsumers: IUserConsumer[];
  private chunkFilters: IChunkFilter[];

  constructor(params?: IInitialParams) {
    checkInitialParams(params);

    super({ objectMode: true });

    this.initialParams = _.cloneDeep(params);
    this.fieldTypes = { ...params?.fields };
    this.fieldNames = Object.keys(params?.fields);
    this.statisticsCalculators = [];
    this.cortegesNumber = 0;
    this.userConsumers = [];
    this.chunkFilters = [];
  }

  private checkIsFieldExists(fieldName: string) {
    return this.fieldNames.includes(fieldName);
  }

  private createTextReport(): string {
    const reportWithoutCounter = this.statisticsCalculators.reduce<string>((report, statisticsCalculator) => {
      const pieceOfReport = statisticsCalculator.getStatisticsInStringNotation();

      if (!report.length) {
        return pieceOfReport;
      }

      return report.concat('\n').concat(pieceOfReport);
    }, '');

    if (this.initialParams.countCorteges) {
      return `Corteges number: ${this.cortegesNumber}\n`.concat(reportWithoutCounter);
    }

    return reportWithoutCounter;
  }

  private createObjectReport(): IObjectReport {
    const fieldStatistics = this.statisticsCalculators.reduce((acc, statisticsCalculator) => {
      const currentStatistics = statisticsCalculator.getStatisticsInObjectNotation();
      const fieldName = statisticsCalculator.getFieldName();

      if (!acc[fieldName]) {
        acc[fieldName] = currentStatistics[fieldName];
      }

      acc[fieldName] = { ...acc[fieldName], ...currentStatistics[fieldName] };

      return acc;
    }, {});

    if (this.initialParams.countCorteges) {
      return { cortegesNumber: this.cortegesNumber, statistics: fieldStatistics };
    }

    return { statistics: fieldStatistics };
  }

  public addStatisticalParam(
    fieldName: string,
    statisticalParamType: FelixStatisticalType,
    options?: IRequestedStatisticsItemOptions,
  ): void {
    checkArgsForAddStatisticalParamMethod(fieldName, statisticalParamType);

    if (!this.checkIsFieldExists(fieldName)) {
      throw new StatisticalParamError('Field name is not found in data fields');
    }

    checkIsStatisticalTypeAvailableForField(fieldName, this.fieldTypes[fieldName], statisticalParamType);

    const statisticsCalculator = statisticsCalculatorFactoriesStatisticalTypesMap.get(statisticalParamType)({
      ...options,
      fieldName,
    });

    this.statisticsCalculators.push(statisticsCalculator);
  }

  public addDataConsumer(consumer: IUserConsumer): void {
    checkUserConsumer(consumer);

    this.userConsumers.push(consumer);
  }

  public addChunkFilter(filter: IChunkFilter): void {
    checkChunkFilter(filter);

    this.chunkFilters.push(filter);
  }

  public _transform(chunk: IChunk, encoding: BufferEncoding, callback: TransformCallback): void {
    if (this.chunkFilters.length) {
      const filtersAnswers = this.chunkFilters.map(filter => !!filter(_.cloneDeep(chunk)));

      if (filtersAnswers.findIndex(answer => answer === false) !== -1) {
        callback();
        return;
      }
    }

    if (this.userConsumers.length) {
      this.userConsumers.forEach(consumer => consumer(_.cloneDeep(chunk)));
    }

    this.statisticsCalculators.forEach(statisticsCalculator => {
      statisticsCalculator.processChunk(chunk);
    });

    if (this.initialParams.countCorteges) {
      this.cortegesNumber = this.cortegesNumber + 1;
    }
    if (!(this.cortegesNumber % 100000) && this.cortegesNumber !== 0) {
      console.log(this.cortegesNumber);
    }

    callback();
  }

  public _flush(callback: TransformCallback): void {
    if (this.initialParams.createTextReport) {
      this.push(this.createTextReport());
      callback();
      return;
    }

    this.push(this.createObjectReport());
    callback();
  }
}

export { FelixType, FelixStatisticalType, Felix };
