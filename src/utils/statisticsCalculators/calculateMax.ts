import { IStatisticsCalculator } from '../../models';
import { parseNumber } from '../parseNumber';
import { isNumber } from '../validators';

export interface ICalculateMaxParams {
  max: number;
}

export const calculateMax: IStatisticsCalculator = (
  fieldName: string,
  fieldValue?: string | number,
  statisticalParams?: ICalculateMaxParams,
): ICalculateMaxParams => {
  fieldValue = parseNumber(fieldValue);
  isNumber(fieldName, fieldValue);

  return statisticalParams ? { max: Math.max(statisticalParams.max, fieldValue) } : { max: fieldValue };
};
