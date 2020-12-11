import { checkChunkFilter } from '../checkChunkFilter';

describe('checkChunkFilter', () => {
  test('should throw error, when function is not defined', () => {
    const check = () => checkChunkFilter(undefined);
    expect(check).toThrow('Filter function is not defined');
  });

  test('should throw error, when argument is not function', () => {
    let check;

    // @ts-ignore
    check = () => checkChunkFilter(1);
    expect(check).toThrow('Filter should be a function');

    // @ts-ignore
    check = () => checkChunkFilter({});
    expect(check).toThrow('Filter should be a function');

    // @ts-ignore
    check = () => checkChunkFilter({});
    expect(check).toThrow('Filter should be a function');

    // @ts-ignore
    check = () => checkChunkFilter(true);
    expect(check).toThrow('Filter should be a function');
  });
});
