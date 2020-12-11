import { checkUserConsumer } from '../checkUserConsumer';

describe('checkUserConsumer', () => {
  test('should throw error, when function-consumer is not defined', () => {
    const check = () => checkUserConsumer(undefined);
    expect(check).toThrow('Consumer function is not defined');
  });

  test('should throw error, when argument is not function', () => {
    let check;

    // @ts-ignore
    check = () => checkUserConsumer('a');
    expect(check).toThrow('Consumer should be a function');

    // @ts-ignore
    check = () => checkUserConsumer(5);
    expect(check).toThrow('Consumer should be a function');

    // @ts-ignore
    check = () => checkUserConsumer({});
    expect(check).toThrow('Consumer should be a function');

    // @ts-ignore
    check = () => checkUserConsumer(true);
    expect(check).toThrow('Consumer should be a function');
  });
});
