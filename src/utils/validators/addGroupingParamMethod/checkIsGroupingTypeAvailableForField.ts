import { StatisticalParamError } from '../../../errors';
import { DataTypeAndAvailableGroupingTypeMap, FelixGroupingType, FelixType } from '../../../models';

export const checkIsGropingTypeAvailableForField = (
  fieldName: string,
  fieldType: FelixType,
  statisticalType: FelixGroupingType,
): void => {
  const availableGroupingTypes = DataTypeAndAvailableGroupingTypeMap.get(fieldType);

  if (!availableGroupingTypes.includes(statisticalType)) {
    throw new StatisticalParamError(`This grouping type is not available for field "${fieldName}"`);
  }
};
