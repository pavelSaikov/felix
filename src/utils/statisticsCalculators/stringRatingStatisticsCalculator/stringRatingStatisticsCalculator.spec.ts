import { StringRatingStatisticsCalculator } from './stringRatingStatisticsCalculator';

describe('StringRatingStatisticsCalculator', () => {
  test('should correctly calculate rating', () => {
    const data = [{ field: 1 }, { field: 'pavel' }, { field: 1 }, { field: 2 }, { field: 'pavel' }, { field: 3 }];
    const stringRatingStatisticsCalculator = new StringRatingStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => stringRatingStatisticsCalculator.processChunk(record));

    expect(stringRatingStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({
      field: {
        ['String Rating']: {
          '1': 2,
          '2': 1,
          '3': 1,
          pavel: 2,
        },
      },
    });
  });
});
