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

  statisticalParams[roundedFieldValue]
    ? statisticalParams[roundedFieldValue]++
    : (statisticalParams[roundedFieldValue] = 1);

  return statisticalParams;
};
