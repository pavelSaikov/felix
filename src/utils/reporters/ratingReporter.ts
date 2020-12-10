import { IRatingMap } from '../../models';

export const ratingReporter = (
  statisticalParameter: string,
  fieldName: string,
  statisticsParams: IRatingMap,
): string => {
  const valuesMap = JSON.stringify(statisticsParams);

  return `Field Name: ${fieldName}. Statistical Parameter: ${statisticalParameter}. Values: ${valuesMap}`;
};
