import { StatisticalParamError } from '../../errors';
import {
  DataTypeAndAvailableStatisticalTypeMap,
  FelixStatisticalType,
  FelixStatisticalTypes,
  FelixType,
} from '../../models';

export const checkArgsForAddStatisticalParamMethod = (
  fieldName?: string,
  statisticalParamType?: FelixStatisticalType,
): void => {
  if (!fieldName) {
    throw new StatisticalParamError('Field name is not defined');
  }

  if (!statisticalParamType) {
    throw new StatisticalParamError('Type of statistical param is not defined');
  }

  if (!FelixStatisticalTypes.includes(statisticalParamType)) {
    throw new StatisticalParamError('Type of statistical parameter is not valid');
  }
};

export const checkIsStatisticalTypeAvailableForField = (
  fieldName: string,
  fieldType: FelixType,
  statisticalType: FelixStatisticalType,
): void => {
  const availableStatisticalTypes = DataTypeAndAvailableStatisticalTypeMap.get(fieldType);

  if (!availableStatisticalTypes.includes(statisticalType)) {
    throw new StatisticalParamError(`This statistical type is not available for field "${fieldName}"`);
  }
};
