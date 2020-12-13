import { IStatisticsCalculator } from '../../models';
import { parseNumber } from '../parseNumber';

export interface ICalculateMeanParams {
  mean: number;
  elementsNumber: number;
}

export const calculateMean: IStatisticsCalculator = (
  fieldName: string,
  fieldValue: string | number | undefined,
  statisticsParams?: ICalculateMeanParams,
): ICalculateMeanParams => {
  if (!statisticsParams) {
    statisticsParams = { mean: 0, elementsNumber: 0 };
  }

  fieldValue = parseNumber(fieldValue);
  if (isNaN(fieldValue)) {
    throw new TypeError(`Field ${fieldName} is not a number. Cortege number - ${statisticsParams.elementsNumber + 1}`);
  }

  const newElementsNumber = statisticsParams.elementsNumber + 1;
  statisticsParams.mean = (statisticsParams.mean * statisticsParams.elementsNumber + fieldValue) / newElementsNumber;
  statisticsParams.elementsNumber = newElementsNumber;

  return statisticsParams;
};
