export interface IStatisticsCalculator {
  (fieldName: string, fieldValue: string | number, statisticalParams: { [key: string]: any }): { [key: string]: any };
}
