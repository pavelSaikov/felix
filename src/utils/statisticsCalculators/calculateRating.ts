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

  const newStatisticalParams = { ...statisticalParams };

  newStatisticalParams[fieldValue] ? newStatisticalParams[fieldValue]++ : (newStatisticalParams[fieldValue] = 1);

  return newStatisticalParams;
};
