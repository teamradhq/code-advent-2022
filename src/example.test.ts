import { example } from '@src/example';

describe('example', () => {
  it('should run the test', () => {
    expect.assertions(1);
    
    expect(example('Hello')).toBe('Example: Hello');
  });
});
