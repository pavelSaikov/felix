export * from './felixStatisticalTypes';
export * from './felixTypes';
export * from './initialParams';
export * from './statisticsCalculator';

export interface IChunk {
  [key: string]: string | number;
}

export interface IUserConsumer {
  (chunk: IChunk): void;
}
