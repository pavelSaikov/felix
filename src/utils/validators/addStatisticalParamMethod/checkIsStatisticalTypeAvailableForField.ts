import { StatisticalParamError } from '../../../errors';
import { DataTypeAndAvailableStatisticalTypeMap, FelixStatisticalType, FelixType } from '../../../models';

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
