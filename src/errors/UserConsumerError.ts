export class UserConsumerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'User Consumer Error';
  }
}
