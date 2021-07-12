const { Parser } = require('./parser');

describe('Parser', () => {
  test('param object', () => {
    const p = { ...Parser.getCsvParams('ping') };
    expect(typeof p === 'object').toBeTruthy();
  });

  test('xymondboard will be array', () => {
    const board = { ...Parser.getCsvParams('xymondboard') };
    expect(board.downstreamFormat).not.toBeDefined();
    expect(board.properArray).toBeDefined();
  });

  test('xymondboard has fields', () => {
    const bf = { ...Parser.getCsvParams('xymondboard fields=hostname,testname,line1') };
    expect(bf.headers).toEqual(['hostname', 'testname', 'line1']);

    const foo = { ...Parser.getCsvParams('xymondboard fields=hostname,testname,line1,foo') };
    expect(foo.headers).not.toContain('foo');

    const nl = { ...Parser.getCsvParams('xymondboard\nfields=hostname,color') };
    expect(nl.headers).toEqual(['hostname', 'color']);

    const xmh = { ...Parser.getCsvParams('xymondboard\nfields=XMH_PAGETITLE') };
    expect(xmh.headers).toEqual(['XMH_PAGETITLE']);
  });

  test('clientlog is a match', () => {
    const m = Parser.msg(Buffer.from('clientlog 5f97cb01ea6f section=clock')).is('clientlog');
    expect(m).toBeTruthy();
  });
});
