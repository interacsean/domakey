const getCliArgs = require('./getCliArgs');

describe('getCliArgs', function() {

  test('parsing `component home --no-flow`', function() {
    const args = ['component', 'home', '--no-flow'];

    const { line: argLine, flags: argFlags } = getCliArgs(args);

    expect(argLine[0]).toBe('component');
    expect(argLine[0]).toBe('component');
    expect(argLine[1]).toBe('home');
    expect(argLine[2]).toBeUndefined();
    expect(argFlags['flow']).toEqual(false);
    expect(argFlags['component']).toBeUndefined();
  });

  test('parsing `--no-flow component home', function() {
    const args = ['--no-flow', 'component', 'home'];
  
    const { line: argLine, flags: argFlags } = getCliArgs(args);

    expect(argLine[0]).toBe('component');
    expect(argLine[0]).toBe('component');
    expect(argLine[1]).toBe('home');
    expect(argLine[2]).toBeUndefined();
    expect(argFlags['flow']).toEqual(false);
    expect(argFlags['component']).toBeUndefined();
  });

  test('parsing `component home --use-flow', function() {
    const args = ['component', 'home', '--use-flow'];
  
    const { line: argLine, flags: argFlags } = getCliArgs(args);

    expect(argLine[0]).toBe('component');
    expect(argLine[0]).toBe('component');
    expect(argLine[1]).toBe('home');
    expect(argLine[2]).toBeUndefined();
    expect(argFlags['use-flow']).toEqual(true);
    expect(argFlags['component']).toBeUndefined();
  });

  test('parsing `--use-flow component home', function() {
    const args = ['--use-flow', 'component', 'home'];
  
    const { line: argLine, flags: argFlags } = getCliArgs(args);

    expect(argLine[0]).toBe('component');
    expect(argLine[0]).toBe('component');
    expect(argLine[1]).toBe('home');
    expect(argLine[2]).toBeUndefined();
    expect(argFlags['use-flow']).toEqual(true);
    expect(argFlags['component']).toBeUndefined();
  });
});

