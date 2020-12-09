import { parseNumber } from '../parseNumber';

describe('parseNumber', () => {
  test('should parse number from string', () => {
    const stringNumber = '5';
    const result = parseNumber(stringNumber);

    expect(result).toBe(5);
  });

  test('should return number when argument is number', () => {
    const number = 5;
    const result = parseNumber(number);

    expect(result).toBe(5);
  });

  test('should correct parse string with float number', () => {
    const stringNumber = '5.4';
    const result = parseNumber(stringNumber);

    expect(result).toBe(5.4);
  });

  test('should replace comma with point in string and return correct float number', () => {
    const stringNumber = '5,4';
    const result = parseNumber(stringNumber);

    expect(result).toBe(5.4);
  });

  test('should return NaN when string contains incorrect number view', () => {
    const stringNumber = '5,4a';
    const result = parseNumber(stringNumber);

    expect(result).toBe(NaN);
  });

  test('should return NaN when argument is null or undefined', () => {
    const undefinedResult = parseNumber(undefined);
    const nullResult = parseNumber(null);

    expect(undefinedResult).toBe(NaN);
    expect(nullResult).toBe(NaN);
  });

  test('should return NaN when argument is object', () => {
    const object = {};
    // @ts-ignore
    const result = parseNumber(object);

    expect(result).toBe(NaN);
  });
});
