import { UserConsumerError } from '../../errors';
import { IUserConsumer } from '../../models';

export const checkUserConsumer = (consumer: IUserConsumer): void => {
  if (!consumer) {
    throw new UserConsumerError('Consumer function is not defined');
  }

  if (!(consumer instanceof Function)) {
    throw new UserConsumerError('Consumer should be a function');
  }
};
