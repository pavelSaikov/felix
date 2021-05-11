import { MinNumberStatisticsCalculator } from './minNumberStatisticsCalculator';

describe('calculateMin', () => {
  test('should correctly calculate mean value', () => {
    const data = [{ field: 2 }, { field: 1 }, { field: 3 }];
    const minNumberStatisticsCalculator = new MinNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => minNumberStatisticsCalculator.processChunk(record));

    expect(minNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Min: 1 } });
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 0.8 }, { field: '2.1' }, { field: '3,1' }];
    const minNumberStatisticsCalculator = new MinNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => minNumberStatisticsCalculator.processChunk(record));

    expect(minNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Min: 0.8 } });
  });
});
