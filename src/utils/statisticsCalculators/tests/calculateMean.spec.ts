import { calculateMean } from '../calculateMean';

describe('calculateMean', () => {
  test('should correctly calculate mean value', () => {
    const data = [{ field: 1 }, { field: 2 }, { field: 3 }];
    const meanStatisticsObject = data.reduce(
      (statistics, record) => calculateMean('field', record.field, statistics),
      null,
    );

    expect(meanStatisticsObject.mean).toEqual(2);
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 0.8 }, { field: '2.1' }, { field: '3,1' }];
    const meanStatisticsObject = data.reduce(
      (statistics, record) => calculateMean('field', record.field, statistics),
      null,
    );

    expect(meanStatisticsObject.mean).toEqual(2);
  });

  test('should throw error when operate with incorrect values', () => {
    const data = [{ field: undefined }, { field: '1.3' }, { field: '1,5' }];
    const calcMeanValue = () =>
      data.reduce((statistics, record) => calculateMean('field', record.field, statistics), null);

    expect(calcMeanValue).toThrowError();
  });
});
