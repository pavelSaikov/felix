import { FelixType } from '../../../models';
import { checkInitialParams } from '../checkInitialParams';

describe('checkInitialParams', () => {
  test('should throw error, when initial params is not defined', () => {
    const check = () => checkInitialParams(undefined);
    expect(check).toThrow('Initial parameters is not defined');
  });

  test('should throw error, when "createTextReport" param defined, but it type is not boolean', () => {
    let check;

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, createTextReport: 1 });
    expect(check).toThrow('Parameter "createReport" should has type Boolean or Undefined');

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, createTextReport: '1' });
    expect(check).toThrow('Parameter "createReport" should has type Boolean or Undefined');

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, createTextReport: {} });
    expect(check).toThrow('Parameter "createReport" should has type Boolean or Undefined');
  });

  test('should throw error, when "countCorteges" param defined, but it type is not boolean', () => {
    let check;

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, countCorteges: 1 });
    expect(check).toThrow('Parameter "countCorteges" should has type Boolean or Undefined');

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, countCorteges: '1' });
    expect(check).toThrow('Parameter "countCorteges" should has type Boolean or Undefined');

    // @ts-ignore
    check = () => checkInitialParams({ fields: { a: FelixType.Number }, countCorteges: {} });
    expect(check).toThrow('Parameter "countCorteges" should has type Boolean or Undefined');
  });

  test('should throw error, when "fields" param is not defined', () => {
    const check = () => checkInitialParams({});
    expect(check).toThrow('Data fields is not defined');
  });

  test('should throw error, when "fields" param is defined, but not contain any values', () => {
    const check = () => checkInitialParams({ fields: {} });
    expect(check).toThrow('"fields" param should at least have one item');
  });

  test('should throw error, when field type contains incorrect type', () => {
    // @ts-ignore
    const check = () => checkInitialParams({ fields: { a: 'hello' } });
    expect(check).toThrow('Incorrect data type for field "a"');
  });
});
