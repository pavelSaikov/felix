import { FelixStatisticalType } from '../../../models';
import { statisticalTypeStatisticsExtractorMap } from '../index';

describe('singleValueStatisticsExtractors: ', () => {
  describe('mean: ', () => {
    test('should return mean value', () => {
      const statistics = { mean: 1.5 };

      const mean = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.mean)(statistics);

      expect(mean).toBe(statistics.mean);
    });

    test('should return undefined when statistics is not defined', () => {
      const mean = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.mean)(undefined);

      expect(mean).toBe(undefined);
    });
  });

  describe('min: ', () => {
    test('should return minimum value', () => {
      const statistics = { min: 1.5 };

      const min = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.min)(statistics);

      expect(min).toBe(statistics.min);
    });

    test('should return undefined when statistics is not defined', () => {
      const min = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.min)(undefined);

      expect(min).toBe(undefined);
    });
  });

  describe('max: ', () => {
    test('should return maximum value', () => {
      const statistics = { max: 1.5 };

      const max = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.max)(statistics);

      expect(max).toBe(statistics.max);
    });

    test('should return undefined when statistics is not defined', () => {
      const max = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.max)(undefined);

      expect(max).toBe(undefined);
    });
  });
});
