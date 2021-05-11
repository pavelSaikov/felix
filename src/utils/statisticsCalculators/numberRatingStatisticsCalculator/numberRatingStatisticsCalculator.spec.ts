import { NumberRatingStatisticsCalculator } from './numberRatingStatisticsCalculator';

describe('calculateIntegerRating', () => {
  test('should correctly calculate integer rating', () => {
    const data = [{ field: 1 }, { field: 1.3 }, { field: 1.5 }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const numberRatingStatisticsCalculator = new NumberRatingStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => numberRatingStatisticsCalculator.processChunk(record));

    expect(numberRatingStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({
      field: { ['Number Rating']: { '1': 1, '1.3': 1, '1.5': 1, '2': 1, '3': 1 } },
    });
  });

  test('should correctly calculate integer rating when some values are number-strings', () => {
    const data = [{ field: 1 }, { field: '1.3' }, { field: '1,5' }, { field: 2 }, { field: 2.2 }, { field: 3 }];
    const numberRatingStatisticsCalculator = new NumberRatingStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => numberRatingStatisticsCalculator.processChunk(record));

    expect(numberRatingStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({
      field: { ['Number Rating']: { '1': 1, '1.3': 1, '1.5': 1, '2': 1, '3': 1 } },
    });
  });
});
