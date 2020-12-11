import { FelixStatisticalType } from '../../../models';
import { checkArgsForAddStatisticalParamMethod } from '../checkArgsForAddStatisticalParamMethod';

describe('checkArgsForAddStatisticalParamMethod', () => {
  test('should throw Error, when field name is not defined', () => {
    const check = () => checkArgsForAddStatisticalParamMethod(undefined, FelixStatisticalType.min);
    expect(check).toThrow('Field name is not defined');
  });

  test('should throw Error, when field name is not string', () => {
    // @ts-ignore
    let check = () => checkArgsForAddStatisticalParamMethod(1, FelixStatisticalType.min);
    expect(check).toThrow('Field name should has "string type');

    // @ts-ignore
    check = () => checkArgsForAddStatisticalParamMethod({}, FelixStatisticalType.min);
    expect(check).toThrow('Field name should has "string type');
  });

  test('should throw Error, when statistical type is not defined', () => {
    const check = () => checkArgsForAddStatisticalParamMethod('banana', undefined);
    expect(check).toThrow('Type of statistical param is not defined');
  });

  test('should throw Error, when statistical type is not valid', () => {
    // @ts-ignore
    let check = () => checkArgsForAddStatisticalParamMethod('banana', 5);
    expect(check).toThrow('Type of statistical parameter is not valid');

    // @ts-ignore
    check = () => checkArgsForAddStatisticalParamMethod('banana', 'a');
    expect(check).toThrow('Type of statistical parameter is not valid');

    // @ts-ignore
    check = () => checkArgsForAddStatisticalParamMethod('banana', {});
    expect(check).toThrow('Type of statistical parameter is not valid');

    // @ts-ignore
    check = () => checkArgsForAddStatisticalParamMethod('banana', true);
    expect(check).toThrow('Type of statistical parameter is not valid');
  });

  test('should return undefined, when all is ok', () => {
    const result = checkArgsForAddStatisticalParamMethod('age', FelixStatisticalType.min);
    expect(result).toBeUndefined();
  });
});
