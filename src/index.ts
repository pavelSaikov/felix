import { Transform, TransformCallback } from 'stream';
import _ from 'lodash';

import { StatisticalParamError } from './errors';
import {
  FelixStatisticalType,
  FelixType,
  IFields,
  IInitialParams,
  IObjectReport,
  IRequestedStatisticsItem,
  IRequestedStatisticsItemOptions,
  IStatisticalData,
} from './models';
import {
  checkArgsForAddStatisticalParamMethod,
  checkInitialParams,
  checkIsStatisticalTypeAvailableForField,
  statisticalParamStatisticalReporterMap,
  statisticalTypeStatisticsExtractorMap,
  statisticsCalculatorsStatisticalTypesMap,
} from './utils';

class Felix extends Transform {
  private readonly initialParams: IInitialParams;
  private readonly fieldTypes: IFields;
  private readonly fieldNames: string[];
  private requestedStatistics: IRequestedStatisticsItem[];
  private statisticalData: IStatisticalData;
  private cortegesNumber: number;

  constructor(params?: IInitialParams) {
    checkInitialParams(params);

    super({ objectMode: true });

    this.initialParams = _.cloneDeep(params);
    this.fieldTypes = { ...params?.fields };
    this.fieldNames = Object.keys(params?.fields);
    this.requestedStatistics = [];
    this.statisticalData = {};
    this.cortegesNumber = 0;
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

  public _transform(
    chunk: { [key: string]: string | number },
    encoding: BufferEncoding,
    callback: TransformCallback,
  ): void {
    this.requestedStatistics.forEach(({ fieldName, statisticalType }) => {
      const currentStatistics = this.statisticalData[fieldName]?.[statisticalType];
      const statisticsCalculator = statisticsCalculatorsStatisticalTypesMap.get(statisticalType);
      const newStatistics = statisticsCalculator(fieldName, chunk[fieldName], currentStatistics);

      this.statisticalData = {
        ...this.statisticalData,
        [fieldName]: { ...this.statisticalData[fieldName], [statisticalType]: newStatistics },
      };
    });

    if (this.initialParams.countCorteges) {
      this.cortegesNumber++;
    }

    callback();
  }

  public _flush(callback: TransformCallback): void {
    if (this.initialParams.createTextReport) {
      this.push(this.createTextReport());
      callback();
      return;
    }

    this.push(JSON.stringify(this.createObjectReport()));
    callback();
  }
}

export { FelixType, FelixStatisticalType, Felix };
