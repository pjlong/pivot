import { BytesizePipe } from './bytesize.pipe';

describe('BytesizePipe', () => {
  let pipe: BytesizePipe;

  beforeEach(() => {
    pipe = new BytesizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('small to large units', () => {
    it('only displays 3 decimal points', () => {
      const outp = pipe.transform(123456, 'mb');
      expect(outp).toEqual('0.123mB');
    });
  });

  describe('large to small units', () => {
    it('rounds value', () => {
      const outp = pipe.transform(123, 'mb', 'b');
      expect(outp).toEqual('123000000b');
    });
  });
});
