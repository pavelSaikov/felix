import { IStatisticsCalculator } from '../../models';

export interface ICalculateRatingParams {
  [key: string]: number;
}

export const calculateRating: IStatisticsCalculator = (
  fieldName: string,
  fieldValue?: string | number,
  statisticalParams?: ICalculateRatingParams,
) => {
  if (fieldValue === null || fieldValue === undefined) {
    throw new TypeError(`Value for field ${fieldName} is not defined`);
  }

  if (!statisticalParams) {
    statisticalParams = {};
  }

  statisticalParams[fieldValue] ? statisticalParams[fieldValue]++ : (statisticalParams[fieldValue] = 1);

  return statisticalParams;
};
