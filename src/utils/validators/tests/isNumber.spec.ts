import { isNumber } from '../isNumber';

describe('isNumber', () => {
  test('should throw error, when argument is not number', () => {
    let check;

    // @ts-ignore
    check = () => isNumber('age', {});
    expect(check).toThrow('Field age is not a number.');

    // @ts-ignore
    check = () => isNumber('age', '5,5');
    expect(check).toThrow('Field age is not a number.');

    // @ts-ignore
    check = () => isNumber('age', true);
    expect(check).toThrow('Field age is not a number.');

    // @ts-ignore
    check = () => isNumber('age', undefined);
    expect(check).toThrow('Field age is not a number.');

    // @ts-ignore
    check = () => isNumber('age', null);
    expect(check).toThrow('Field age is not a number.');
  });

  test('should return "true", when argument is number', () => {
    const result = isNumber('age', 5);
    expect(result).toBe(true);
  });

  test('should return "true", when argument is string-number', () => {
    const result = isNumber('age', '5.5');
    expect(result).toBe(true);
  });
});
