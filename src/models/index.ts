export * from './felixStatisticalTypes';
export * from './felixTypes';
export * from './initialParams';
export * from './statisticsCalculator';
export * from './felixGroupingTypes';

export interface IChunk {
  [key: string]: string | number;
}

export interface IUserConsumer {
  (chunk: IChunk): void;
}

export interface IChunkFilter {
  (chunk: IChunk): boolean;
}
