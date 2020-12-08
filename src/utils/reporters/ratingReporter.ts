import { IRatingMap } from '../../models';

export const ratingReporter = (reporterType: string, fieldName: string, statisticsParams: IRatingMap): string => {
  const valuesMap = JSON.stringify(statisticsParams);

  return `Field Name: ${fieldName}. Statistical Parameter: ${reporterType} reporter. Values: ${valuesMap}`;
};
