import { StatisticalParamError } from '../../errors';
import { FelixStatisticalType, FelixStatisticalTypes } from '../../models';

export const checkArgsForAddStatisticalParamMethod = (
  fieldName?: string,
  statisticalParamType?: FelixStatisticalType,
): void => {
  if (!fieldName) {
    throw new StatisticalParamError('Field name is not defined');
  }

  if (!(typeof fieldName === 'string')) {
    throw new StatisticalParamError('Field name should has "string type"');
  }

  if (!statisticalParamType) {
    throw new StatisticalParamError('Type of statistical param is not defined');
  }

  if (!FelixStatisticalTypes.includes(statisticalParamType)) {
    throw new StatisticalParamError('Type of statistical parameter is not valid');
  }
};
