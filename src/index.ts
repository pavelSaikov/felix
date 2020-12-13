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
  IRequestedStatisticsItem,
  IRequestedStatisticsItemOptions,
  IStatisticalData,
  IUserConsumer,
} from './models';
import {
  checkArgsForAddStatisticalParamMethod,
  checkChunkFilter,
  checkInitialParams,
  checkIsStatisticalTypeAvailableForField,
  checkUserConsumer,
  statisticalParamStatisticalReporterMap,
  statisticalTypeStatisticsExtractorMap,
  statisticsCalculatorsStatisticalTypesMap,
} from './utils';

class Felix extends Transform {
  private readonly initialParams: IInitialParams;
  private readonly fieldTypes: IFields;
  private readonly fieldNames: string[];
  private readonly statisticalData: IStatisticalData;
  private requestedStatistics: IRequestedStatisticsItem[];
  private cortegesNumber: number;
  private userConsumers: IUserConsumer[];
  private chunkFilters: IChunkFilter[];

  constructor(params?: IInitialParams) {
    checkInitialParams(params);

    super({ objectMode: true });

    this.initialParams = _.cloneDeep(params);
    this.fieldTypes = { ...params?.fields };
    this.fieldNames = Object.keys(params?.fields);
    this.requestedStatistics = [];
    this.statisticalData = {};
    this.cortegesNumber = 0;
    this.userConsumers = [];
    this.chunkFilters = [];
  }

  private checkIsFieldExists(fieldName: string) {
    return this.fieldNames.includes(fieldName);
  }

  private createTextReport(): string {
    const reportWithoutCounter = this.requestedStatistics.reduce<string>((report, pieceOfStatistics) => {
      const { statisticalType, fieldName, options } = pieceOfStatistics;
      const statistics = this.statisticalData[fieldName][statisticalType];
      const pieceOfReport = statisticalParamStatisticalReporterMap.get(statisticalType)(fieldName, statistics, options);

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
    const fieldStatistics = this.requestedStatistics.reduce((acc, { fieldName, statisticalType, options }) => {
      const currentStatistics = this.statisticalData[fieldName]?.[statisticalType];
      const preparedStatisticsItem = statisticalTypeStatisticsExtractorMap.get(statisticalType)(
        currentStatistics,
        options,
      );

      if (!acc[fieldName]) {
        acc[fieldName] = {};
      }

      acc[fieldName][statisticalType] = preparedStatisticsItem;

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

    this.requestedStatistics.push({ fieldName, statisticalType: statisticalParamType, options });
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

    this.requestedStatistics.forEach(({ fieldName, statisticalType }) => {
      const currentStatistics = this.statisticalData[fieldName]?.[statisticalType];
      const statisticsCalculator = statisticsCalculatorsStatisticalTypesMap.get(statisticalType);
      const newStatistics = statisticsCalculator(fieldName, chunk[fieldName], currentStatistics);

      if (!this.statisticalData[fieldName]) {
        this.statisticalData[fieldName] = {};
      }

      this.statisticalData[fieldName][statisticalType] = newStatistics;
    });

    if (this.initialParams.countCorteges) {
      this.cortegesNumber++;
    }
    if (!(this.cortegesNumber % 100000)) {
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
