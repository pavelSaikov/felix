import { FelixStatisticalType } from '../../../models';
import { statisticalTypeStatisticsExtractorMap } from '../index';

describe('ratingStatisticsExtractors: ', () => {
  describe('simple rating extractor', () => {
    let ratingStatistics;

    beforeEach(() => {
      ratingStatistics = { a: 10, b: 9, c: 8, d: 7, e: 6, f: 5, g: 4, h: 3 };
    });

    test('should return 7 most popular values', () => {
      const rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)(ratingStatistics, {
        valuesNumber: 7,
      });

      expect(Object.keys(rating).length).toBe(7);
    });

    test('should return 5 most popular values, when "valuesNumber" option is not defined', () => {
      const rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)(ratingStatistics);

      expect(Object.keys(rating).length).toBe(5);
    });

    test('should return empty object, when "statistics" parameter is not object', () => {
      let rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)('');
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)(null);
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)(undefined);
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.rating)('1');
      expect(rating).toStrictEqual({});
    });
  });

  describe('integer rating extractor', () => {
    let integerRatingStatistics;

    beforeEach(() => {
      integerRatingStatistics = { '1': 10, '2': 9, '3': 8, '4': 7, '5': 6, '6': 5, '7': 4, '8': 3 };
    });

    test('should return 7 most popular integer values', () => {
      const rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)(
        integerRatingStatistics,
        {
          valuesNumber: 7,
        },
      );

      expect(Object.keys(rating).length).toBe(7);
    });

    test('should return 5 most popular integer values, when "valuesNumber" option is not defined', () => {
      const rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)(
        integerRatingStatistics,
      );

      expect(Object.keys(rating).length).toBe(5);
    });

    test('should return empty object, when "integerRatingStatistics" parameter is not object', () => {
      let rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)('');
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)(null);
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)(undefined);
      expect(rating).toStrictEqual({});

      rating = statisticalTypeStatisticsExtractorMap.get(FelixStatisticalType.integerRating)('1');
      expect(rating).toStrictEqual({});
    });
  });
});
