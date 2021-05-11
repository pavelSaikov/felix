import { IRatingMap, IRequestedStatisticsItemOptions } from '../../models';
import { DEFAULT_VALUES_NUMBER } from '../constants';

export const ratingReporter = (
  statisticalParameter: string,
  fieldName: string,
  statisticsParams: IRatingMap,
  options?: IRequestedStatisticsItemOptions,
): string => {
  const ratings = Object.keys(statisticsParams).map(key => ({ key, value: statisticsParams[key] }));
  ratings.sort((leftRecord, rightRecord) => rightRecord.value - leftRecord.value);

  const requiredValuesNumber =
    options?.valuesNumber && !isNaN(+options.valuesNumber) ? +options.valuesNumber : DEFAULT_VALUES_NUMBER;

  const requiredValues = ratings.slice(0, requiredValuesNumber);
  const valuesMap = JSON.stringify(requiredValues);

  return `Field Name: ${fieldName}. Statistical Parameter: ${statisticalParameter}. Values: ${valuesMap}`;
};
