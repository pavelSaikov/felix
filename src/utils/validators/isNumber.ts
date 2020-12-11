export const isNumber = (fieldName: string, fieldValue?: number | string): boolean => {
  // @ts-ignore
  if ((typeof fieldValue !== 'number' && typeof fieldValue !== 'string') || isNaN(fieldValue)) {
    throw new TypeError(`Field ${fieldName} is not a number.`);
  }

  fieldValue = +fieldValue;

  return true;
};
