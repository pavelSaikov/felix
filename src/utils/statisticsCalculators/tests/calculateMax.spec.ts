import { calculateMax } from '../calculateMax';

describe('calculateMax', () => {
  test('should correctly calculate maximum number', () => {
    const data = [{ field: 1 }, { field: 1.5 }, { field: 1.4 }];
    const maxValueObject = data.reduce((statistics, record) => calculateMax('field', record.field, statistics), null);

    expect(maxValueObject.max).toEqual(1.5);
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 1 }, { field: '1.5' }, { field: '1,3' }];
    const integerRating = data.reduce((statistics, record) => calculateMax('field', record.field, statistics), null);

    expect(integerRating.max).toEqual(1.5);
  });

  test('should throw error when operate with incorrect values', () => {
    const data = [{ field: undefined }, { field: '1.3' }, { field: '1,5' }];
    const calcIntegerRating = () =>
      data.reduce((statistics, record) => calculateMax('field', record.field, statistics), null);

    expect(calcIntegerRating).toThrowError();
  });
});
