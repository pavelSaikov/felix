import { MeanNumberStatisticsCalculator } from './meanNumberStatisticsCalculator';

describe('calculateMean', () => {
  test('should correctly calculate mean value', () => {
    const data = [{ field: 1 }, { field: 2 }, { field: 3 }];
    const meanNumberStatisticsCalculator = new MeanNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => meanNumberStatisticsCalculator.processChunk(record));

    expect(meanNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Mean: 2 } });
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 0.8 }, { field: '2.1' }, { field: '3,1' }];
    const meanNumberStatisticsCalculator = new MeanNumberStatisticsCalculator({ fieldName: 'field' });
    data.forEach(record => meanNumberStatisticsCalculator.processChunk(record));

    expect(meanNumberStatisticsCalculator.getStatisticsInObjectNotation()).toEqual({ field: { Mean: 2 } });
  });
});
