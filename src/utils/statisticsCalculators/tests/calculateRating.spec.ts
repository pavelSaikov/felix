import { calculateRating } from '../calculateRating';

describe('calculateRating', () => {
  test('should correctly calculate  rating', () => {
    const data = [{ field: 1 }, { field: 'pavel' }, { field: 1 }, { field: 2 }, { field: 'pavel' }, { field: 3 }];
    const integerRating = data.reduce((statistics, record) => calculateRating('field', record.field, statistics), null);

    expect(integerRating).toEqual({ '1': 2, '2': 1, '3': 1, pavel: 2 });
  });

  test('should throw error when operate with incorrect values', () => {
    const data = [
      { field: undefined },
      { field: 'pavel' },
      { field: 'pavel' },
      { field: 2 },
      { field: 2 },
      { field: 3 },
    ];
    const calcIntegerRating = () =>
      data.reduce((statistics, record) => calculateRating('field', record.field, statistics), null);

    expect(calcIntegerRating).toThrowError();
  });
});
