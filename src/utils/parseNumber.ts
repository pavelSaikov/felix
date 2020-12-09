export const parseNumber = (value?: string | number): number => {
  if (typeof value === 'string') {
    value = value.replace(',', '.');
  }

  if (typeof value !== 'number' && typeof value !== 'string') {
    return NaN;
  }

  return +value;
};
