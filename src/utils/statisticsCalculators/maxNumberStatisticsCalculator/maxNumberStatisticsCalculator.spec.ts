import { MaxNumberStatisticsCalculator } from './maxNumberStatisticsCalculator';

describe('calculateMax', () => {
  test('should correctly calculate maximum number', () => {
    const data = [{ field: 1 }, { field: 1.5 }, { field: 1.4 }];
    const maxNumberStatisticsCalculator = new MaxNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => maxNumberStatisticsCalculator.processChunk(record));

    expect(maxNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Max: 1.5 } });
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 1 }, { field: '1.5' }, { field: '1,3' }];
    const maxNumberStatisticsCalculator = new MaxNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => maxNumberStatisticsCalculator.processChunk(record));

    expect(maxNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Max: 1.5 } });
  });
});
