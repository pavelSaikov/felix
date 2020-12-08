import { IStatisticsCalculator } from '../../models';
import { parseNumber } from '../parseNumber';
import { isNumber } from '../validators';

export interface ICalculateNumericRatingParams {
  [key: string]: number;
}

export const calculateIntegerRating: IStatisticsCalculator = (
  fieldName: string,
  fieldValue?: string | number,
  statisticalParams?: ICalculateNumericRatingParams,
) => {
  fieldValue = parseNumber(fieldValue);
  isNumber(fieldName, fieldValue);

  if (!statisticalParams) {
    statisticalParams = {};
  }

  const roundedFieldValue = Math.round(fieldValue);
  const newStatisticalParams = { ...statisticalParams };

  newStatisticalParams[roundedFieldValue]
    ? newStatisticalParams[roundedFieldValue]++
    : (newStatisticalParams[roundedFieldValue] = 1);

  return newStatisticalParams;
};
