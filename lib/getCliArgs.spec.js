var assert = require('assert')

const getCliArgs = require('./getCliArgs');

(function(){
  const args = ['component', 'home', '--no-flow'];
  const { line: argLine, flags: argFlags } = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['flow'] === false &&
    !argFlags['component'],
    'getCliArgs failed for `component home --no-flow`'
  );
})();

(function(){
  const args = ['--no-flow', 'component', 'home'];
  const { line: argLine, flags: argFlags } = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['flow'] === false &&
    !argFlags['component'],
    'getCliArgs failed for `--no-flow component home`'
  );
})();

(function(){
  const args = ['component', 'home', '--use-flow'];
  const { line: argLine, flags: argFlags } = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['use-flow'] &&
    !argFlags['component'],
    'getCliArgs failed for `component home --use-flow`'
  );
})();

(function(){
  const args = ['--use-flow', 'component', 'home'];
  const { line: argLine, flags: argFlags } = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['use-flow'] &&
    !argFlags['component'],
    'getCliArgs failed for `--use-flow component home`'
  );
})();