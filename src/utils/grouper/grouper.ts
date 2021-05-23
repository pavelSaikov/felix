import { IFieldGrouping, IFields, IGrouper, IRequestedStatisticsItem, IStatisticsCalculator } from '../../models';
import { statisticsCalculatorFactoriesStatisticalTypesMap } from '../index';
import { groupingTypeValueExtractorMap } from './constants';

interface GrouperConstructorArgs {
  fieldTypes: IFields;
  requestedStatistics: IRequestedStatisticsItem[];
  fieldsGroupings: IFieldGrouping[];
  nestingLevelIndex: number;
}

export class Grouper implements IGrouper {
  private readonly fieldTypes: IFields;
  private readonly requestedStatistics: IRequestedStatisticsItem[];
  private readonly fieldsGroupings: IFieldGrouping[];
  private readonly nestingLevelIndex: number;
  private readonly groupingFieldValueNestedGroupersMap: Map<string, Grouper>;
  private readonly statisticsCalculators: IStatisticsCalculator[];

  constructor({ fieldTypes, requestedStatistics, fieldsGroupings, nestingLevelIndex }: GrouperConstructorArgs) {
    this.fieldTypes = fieldTypes;
    this.requestedStatistics = requestedStatistics;
    this.fieldsGroupings = fieldsGroupings;
    this.nestingLevelIndex = nestingLevelIndex;

    this.groupingFieldValueNestedGroupersMap = new Map<string, Grouper>();
    this.statisticsCalculators = [];

    this.initializeGrouper();
  }

  private initializeGrouper() {
    if (!this.fieldsGroupings[this.nestingLevelIndex]) {
      this.requestedStatistics.forEach(({ fieldName, statisticalType, options }) => {
        const statisticsCalculator = statisticsCalculatorFactoriesStatisticalTypesMap.get(statisticalType)({
          ...options,
          fieldName,
        });

        this.statisticsCalculators.push(statisticsCalculator);
      });
    }
  }

  public processChunk(chunk: any) {
    if (!this.fieldsGroupings[this.nestingLevelIndex]) {
      this.statisticsCalculators.forEach(statisticsCalculator => {
        statisticsCalculator.processChunk(chunk);
      });
    } else {
      const fieldInfoForGrouping = this.fieldsGroupings[this.nestingLevelIndex];
      const fieldValue = chunk[fieldInfoForGrouping.fieldName];

      const fieldStringValue = groupingTypeValueExtractorMap
        .get(fieldInfoForGrouping.groupingType)(fieldValue)
        .toString();

      const nestedGrouper = this.groupingFieldValueNestedGroupersMap.get(fieldStringValue);

      if (nestedGrouper) {
        nestedGrouper.processChunk(chunk);
      } else {
        const newNestedGrouper = new Grouper({
          fieldTypes: this.fieldTypes,
          requestedStatistics: this.requestedStatistics,
          fieldsGroupings: this.fieldsGroupings,
          nestingLevelIndex: this.nestingLevelIndex + 1,
        });

        newNestedGrouper.processChunk(chunk);
        this.groupingFieldValueNestedGroupersMap.set(fieldStringValue, newNestedGrouper);
      }
    }
  }

  public getStatisticsInObjectNotation() {
    if (!this.fieldsGroupings[this.nestingLevelIndex]) {
      const fieldStatistics = this.statisticsCalculators.reduce((acc, statisticsCalculator) => {
        const currentStatistics = statisticsCalculator.getStatisticsInObjectNotation();
        const fieldName = statisticsCalculator.getFieldName();

        if (!acc[fieldName]) {
          acc[fieldName] = currentStatistics[fieldName];
        }

        acc[fieldName] = { ...acc[fieldName], ...currentStatistics[fieldName] };

        return acc;
      }, {});

      return { statistics: fieldStatistics };
    }

    const groupingInfo = this.fieldsGroupings[0];
    const groupingValues = Array.from(this.groupingFieldValueNestedGroupersMap.keys());

    return {
      [`group_by_${groupingInfo.groupingType}_on_field_${groupingInfo.fieldName}`]: groupingValues.reduce(
        (statistics, groupingValue) => {
          const groupStatistics = this.groupingFieldValueNestedGroupersMap
            .get(groupingValue)
            .getStatisticsInObjectNotation();

          statistics[groupingValue] = groupStatistics;

          return statistics;
        },
        {},
      ),
    };
  }

  public getStatisticsInStringNotation() {
    return JSON.stringify(this.getStatisticsInObjectNotation());
  }
}
