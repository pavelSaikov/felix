import { Transform, TransformCallback } from 'stream';
import _ from 'lodash';

import { StatisticalParamError } from './errors';
import {
  FelixStatisticalType,
  FelixType,
  IFields,
  IInitialParams,
  IRequestedStatisticsItem,
  IRequestedStatisticsItemOptions,
  IStatisticalData,
} from './models';
import {
  checkArgsForAddStatisticalParamMethod,
  checkInitialParams,
  checkIsStatisticalTypeAvailableForField,
  statisticalParamStatisticalReporterMap,
  statisticsCalculatorsStatisticalTypesMap,
} from './utils';

class Felix extends Transform {
  private readonly initialParams: IInitialParams;
  private readonly fieldTypes: IFields;
  private readonly fieldNames: string[];
  private requestedStatistics: IRequestedStatisticsItem[];
  private statisticalData: IStatisticalData;

  constructor(params?: IInitialParams) {
    checkInitialParams(params);

    super({ objectMode: true });

    this.initialParams = _.cloneDeep(params);
    this.fieldTypes = { ...params?.fields };
    this.fieldNames = Object.keys(params?.fields);
    this.requestedStatistics = [];
    this.statisticalData = {};
  }

  private checkIsFieldExists(fieldName: string) {
    return this.fieldNames.includes(fieldName);
  }

  private createReport(): string {
    return this.requestedStatistics.reduce<string>((report, pieceOfStatistics) => {
      const { statisticalType, fieldName, options } = pieceOfStatistics;
      const statistics = this.statisticalData[fieldName][statisticalType];
      const pieceOfReport = statisticalParamStatisticalReporterMap.get(statisticalType)(fieldName, statistics, options);

      if (!report.length) {
        return pieceOfReport;
      }

      return report.concat('\n').concat(pieceOfReport);
    }, '');
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

    callback();
  }

  public _flush(callback: TransformCallback): void {
    if (this.initialParams.createReport) {
      this.push(this.createReport());
      return;
    }

    this.push(this.statisticalData);
    callback();
  }
}

export { FelixType, FelixStatisticalType, Felix };
