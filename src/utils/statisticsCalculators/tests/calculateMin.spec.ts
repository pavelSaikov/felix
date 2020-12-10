import { calculateMin } from '../calculateMin';

describe('calculateMin', () => {
  test('should correctly calculate mean value', () => {
    const data = [{ field: 2 }, { field: 1 }, { field: 3 }];
    const minStatisticsObject = data.reduce(
      (statistics, record) => calculateMin('field', record.field, statistics),
      null,
    );

    expect(minStatisticsObject.min).toEqual(1);
  });

  test('should correctly calculate maximum when some values are number-strings', () => {
    const data = [{ field: 0.8 }, { field: '2.1' }, { field: '3,1' }];
    const minStatisticsObject = data.reduce(
      (statistics, record) => calculateMin('field', record.field, statistics),
      null,
    );

    expect(minStatisticsObject.min).toEqual(0.8);
  });

  test('should throw error when operate with incorrect values', () => {
    const data = [{ field: undefined }, { field: '1.3' }, { field: '1,5' }];
    const minStatisticsObject = () =>
      data.reduce((statistics, record) => calculateMin('field', record.field, statistics), null);

    expect(minStatisticsObject).toThrowError();
  });
});
