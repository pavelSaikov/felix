import { InitialParamsError } from '../../errors';
import { FelixTypes, IFields, IInitialParams } from '../../models';

const checkFieldTypes = (fields?: IFields): void => {
  if (!fields) {
    throw new InitialParamsError('Data fields is not defined');
  }

  Object.keys(fields).forEach((fieldName: string) => {
    if (!FelixTypes.includes(fields[fieldName])) {
      throw new InitialParamsError(`Incorrect data type for field ${fieldName}`);
    }
  });
};

export const checkInitialParams = (params?: IInitialParams): void => {
  if (!params) {
    throw new InitialParamsError('Initial parameters is not defined');
  }

  if (params.createReport !== undefined && typeof params.createReport !== 'boolean') {
    throw new InitialParamsError('Parameter "createReport" should has type Boolean or Undefined');
  }

  if (params.countCorteges !== undefined && typeof params.countCorteges !== 'boolean') {
    throw new InitialParamsError('Parameter "countCorteges" should has type Boolean or Undefined');
  }

  checkFieldTypes(params.fields);
};
