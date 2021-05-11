import { IRatingMap, IRequestedStatisticsItemOptions } from '../../models';
import { DEFAULT_VALUES_NUMBER } from '../constants';

export const extractRatingStatistics = (
  statisticsParams: IRatingMap,
  options?: IRequestedStatisticsItemOptions,
): IRatingMap => {
  if (typeof statisticsParams !== 'object' || statisticsParams === undefined || statisticsParams === null) {
    return {};
  }

  const ratings = Object.keys(statisticsParams).map(key => ({ key, value: statisticsParams[key] }));
  ratings.sort((leftRecord, rightRecord) => rightRecord.value - leftRecord.value);

  const requiredValuesNumber =
    options?.valuesNumber && !isNaN(+options.valuesNumber) ? +options.valuesNumber : DEFAULT_VALUES_NUMBER;
  const requiredValues = ratings.slice(0, requiredValuesNumber);

  return requiredValues.reduce((accumulator, { key, value }) => {
    accumulator[key] = value;
    return accumulator;
  }, {});
};
