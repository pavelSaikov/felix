export const isNumber = (fieldName: string, fieldValue?: string | number): boolean => {
  fieldValue = +fieldValue;

  if (isNaN(fieldValue)) {
    throw new TypeError(`Field ${fieldName} is not a number.`);
  }

  return true;
};
