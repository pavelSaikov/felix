import { calculateIntegerRating } from '../calculateIntegerRating';

describe('calculateIntegerRating', () => {
  test('should correctly calculate integer rating', () => {
    const data = [{ field: 1 }, { field: 1.3 }, { field: 1.5 }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const integerRating = data.reduce(
      (statistics, record) => calculateIntegerRating('field', record.field, statistics),
      null,
    );

    expect(integerRating).toEqual({ '1': 2, '2': 3, '3': 1 });
  });

  test('should correctly calculate integer rating when some values are number-strings', () => {
    const data = [{ field: 1 }, { field: '1.3' }, { field: '1,5' }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const integerRating = data.reduce(
      (statistics, record) => calculateIntegerRating('field', record.field, statistics),
      null,
    );

    expect(integerRating).toEqual({ '1': 2, '2': 3, '3': 1 });
  });

  test('should throw error when operate with incorrect values', () => {
    const data = [{ field: undefined }, { field: '1.3' }, { field: '1,5' }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const calcIntegerRating = () =>
      data.reduce((statistics, record) => calculateIntegerRating('field', record.field, statistics), null);

    expect(calcIntegerRating).toThrowError();
  });
});
