import { IntegerRatingStatisticsCalculator } from './integerRatingStatisticsCalculator';

describe('calculateIntegerRating', () => {
  test('should correctly calculate integer rating', () => {
    const data = [{ field: 1 }, { field: 1.3 }, { field: 1.5 }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const integerRatingStatisticsCalculator = new IntegerRatingStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => integerRatingStatisticsCalculator.processChunk(record));

    expect(integerRatingStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({
      field: { ['Integer Rating']: { '1': 2, '2': 3, '3': 1 } },
    });
  });

  test('should correctly calculate integer rating when some values are number-strings', () => {
    const data = [{ field: 1 }, { field: '1.3' }, { field: '1,5' }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const integerRatingStatisticsCalculator = new IntegerRatingStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => integerRatingStatisticsCalculator.processChunk(record));

    expect(integerRatingStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({
      field: { ['Integer Rating']: { '1': 2, '2': 3, '3': 1 } },
    });
  });
});
