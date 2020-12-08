import { ChunkFilterError } from '../../errors';
import { IChunkFilter } from '../../models';

export const checkChunkFilter = (filter: IChunkFilter): void => {
  if (!filter) {
    throw new ChunkFilterError('Filter function is not defined');
  }

  if (!(filter instanceof Function)) {
    throw new ChunkFilterError('Filter should be a function');
  }
};
