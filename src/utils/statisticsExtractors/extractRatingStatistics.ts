import { IRatingMap, IRequestedStatisticsItemOptions } from '../../models';

export const extractRatingStatistics = (
  statisticsParams: IRatingMap,
  options: IRequestedStatisticsItemOptions,
): IRatingMap => {
  const ratings = Object.keys(statisticsParams).map(key => ({ key, value: statisticsParams[key] }));
  ratings.sort((leftRecord, rightRecord) => rightRecord.value - leftRecord.value);

  const requiredValuesNumber = options?.valuesNumber && !isNaN(+options.valuesNumber) ? +options.valuesNumber : 5;
  const requiredValues = ratings.slice(0, requiredValuesNumber);

  return requiredValues.reduce((accumulator, { key, value }) => {
    accumulator[key] = value;
    return accumulator;
  }, {});
};
