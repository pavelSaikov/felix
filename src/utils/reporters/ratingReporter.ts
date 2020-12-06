import { IRequestedStatisticsItemOptions } from '../../models';

export const ratingReporter = (
  reporterType: string,
  fieldName: string,
  statisticalParamName: string,
  statisticsParams: { [key: string]: number },
  options?: IRequestedStatisticsItemOptions,
): string => {
  const ratings = Object.keys(statisticsParams).map(key => ({ key, value: statisticsParams[key] }));
  ratings.sort((leftRecord, rightRecord) => rightRecord.value - leftRecord.value);

  const requiredValuesNumber = options?.valuesNumber && !isNaN(+options.valuesNumber) ? +options.valuesNumber : 5;
  const requiredValues = ratings.slice(0, requiredValuesNumber);

  const valuesMap = JSON.stringify(
    requiredValues.reduce((accumulator, { key, value }) => {
      accumulator[key] = value;
      return accumulator;
    }, {}),
  );

  return `Field Name: ${fieldName}. Statistical Parameter: ${reporterType} reporter. Values: ${valuesMap}`;
};
