export const parseNumber = (value?: string | number): number => {
  if (typeof value === 'string') {
    value = value.replace(',', '.');
  }

  return +value;
};
