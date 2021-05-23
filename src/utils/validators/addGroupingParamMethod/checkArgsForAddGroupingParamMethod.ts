import { StatisticalParamError } from '../../../errors';
import { FelixGroupingType, FelixGroupingTypes } from '../../../models';

export const checkArgsForAddGropingParamMethod = (
  fieldName?: string,
  statisticalParamType?: FelixGroupingType,
): void => {
  if (!fieldName) {
    throw new StatisticalParamError('Field name is not defined');
  }

  if (!(typeof fieldName === 'string')) {
    throw new StatisticalParamError('Field name should has "string type"');
  }

  if (!statisticalParamType) {
    throw new StatisticalParamError('Type of grouping param is not defined');
  }

  if (!FelixGroupingTypes.includes(statisticalParamType)) {
    throw new StatisticalParamError('Type of grouping parameter is not valid');
  }
};
