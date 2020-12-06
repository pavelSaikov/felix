export const singleValueReporterFactory = (
  fieldName: string,
  statisticalParamName: string,
  value: string | number,
): string => `Field: ${fieldName}. Statistical Parameter: ${statisticalParamName}. Value: ${value}`;
