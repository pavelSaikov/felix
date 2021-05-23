import { FelixStatisticalType, FelixType } from '../../../models';
import { checkIsStatisticalTypeAvailableForField } from '../addStatisticalParamMethod';

describe('checkIsStatisticalTypeAvailableForField', () => {
  test('should throw Error, when user try to apply statistical param for not comparable field type', () => {
    const check = () => checkIsStatisticalTypeAvailableForField('age', FelixType.String, FelixStatisticalType.Min);

    expect(check).toThrow('This statistical type is not available for field "age"');
  });

  test('should return undefined, when all is ok', () => {
    const result = checkIsStatisticalTypeAvailableForField('age', FelixType.Number, FelixStatisticalType.Min);

    expect(result).toBeUndefined();
  });
});
