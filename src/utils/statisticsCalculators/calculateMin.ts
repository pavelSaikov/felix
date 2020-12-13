import { IStatisticsCalculator } from '../../models';
import { parseNumber } from '../parseNumber';
import { isNumber } from '../validators';

export interface ICalculateMinParams {
  min: number;
}

export const calculateMin: IStatisticsCalculator = (
  fieldName: string,
  fieldValue?: string | number,
  statisticalParams?: ICalculateMinParams,
): ICalculateMinParams => {
  fieldValue = parseNumber(fieldValue);
  isNumber(fieldName, fieldValue);

  if (!statisticalParams) {
    return { min: fieldValue };
  }

  statisticalParams.min = Math.min(statisticalParams.min, fieldValue);

  return statisticalParams;
};
