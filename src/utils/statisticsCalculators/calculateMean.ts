import { IStatisticsCalculator } from '../../models';

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

  fieldValue = +fieldValue;
  if (isNaN(fieldValue)) {
    throw new TypeError(`Field ${fieldName} is not a number. Cortege number - ${statisticsParams.elementsNumber + 1}`);
  }

  const { mean, elementsNumber } = statisticsParams;

  const newElementsNumber = elementsNumber + 1;
  const newMeanValue = (mean * elementsNumber + fieldValue) / newElementsNumber;

  return { mean: newMeanValue, elementsNumber: newElementsNumber };
};
