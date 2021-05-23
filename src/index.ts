import { Transform, TransformCallback } from 'stream';
import _ from 'lodash';

import { StatisticalParamError } from './errors';
import {
  FelixGroupingType,
  FelixStatisticalType,
  FelixType,
  IChunk,
  IChunkFilter,
  IFieldGrouping,
  IFields,
  IGrouper,
  IInitialParams,
  IObjectReport,
  IRequestedStatisticsItem,
  IRequestedStatisticsItemOptions,
  IStatisticsCalculator,
  IUserConsumer,
} from './models';
import {
  checkArgsForAddGropingParamMethod,
  checkArgsForAddStatisticalParamMethod,
  checkChunkFilter,
  checkInitialParams,
  checkIsGropingTypeAvailableForField,
  checkIsStatisticalTypeAvailableForField,
  checkUserConsumer,
  Grouper,
} from './utils';

class Felix extends Transform {
  private readonly initialParams: IInitialParams;
  private readonly fieldTypes: IFields;
  private readonly fieldNames: string[];
  private readonly requestedStatistics: IRequestedStatisticsItem[];
  private readonly fieldsGroupings: IFieldGrouping[];
  private statisticsCalculators: IStatisticsCalculator[];
  private cortegesNumber: number;
  private userConsumers: IUserConsumer[];
  private chunkFilters: IChunkFilter[];
  private grouper: IGrouper;

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
    this.requestedStatistics = [];
    this.fieldsGroupings = [];
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
    statisticalType: FelixStatisticalType,
    options?: IRequestedStatisticsItemOptions,
  ): void {
    checkArgsForAddStatisticalParamMethod(fieldName, statisticalType);

    if (!this.checkIsFieldExists(fieldName)) {
      throw new StatisticalParamError('Field name is not found in data fields');
    }

    checkIsStatisticalTypeAvailableForField(fieldName, this.fieldTypes[fieldName], statisticalType);

    this.requestedStatistics.push({ fieldName, statisticalType, options });
  }

  public addGroupingParam(fieldName: string, groupingType: FelixGroupingType): void {
    checkArgsForAddGropingParamMethod(fieldName, groupingType);

    if (!this.checkIsFieldExists(fieldName)) {
      throw new StatisticalParamError('Field name is not found in data fields');
    }

    checkIsGropingTypeAvailableForField(fieldName, this.fieldTypes[fieldName], groupingType);

    this.fieldsGroupings.push({ fieldName, groupingType });
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

    if (!this.grouper) {
      this.grouper = new Grouper({
        fieldTypes: this.fieldTypes,
        fieldsGroupings: this.fieldsGroupings,
        requestedStatistics: this.requestedStatistics,
        nestingLevelIndex: 0,
      });
    }

    this.grouper.processChunk(chunk);

    callback();
  }

  public _flush(callback: TransformCallback): void {
    if (this.initialParams.createTextReport) {
      this.push(this.grouper.getStatisticsInStringNotation());
      callback();
      return;
    }

    this.push(this.grouper.getStatisticsInObjectNotation());
    callback();
  }
}

export { FelixType, FelixStatisticalType, FelixGroupingType, Felix };
