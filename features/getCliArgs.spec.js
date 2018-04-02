var assert = require('assert')

const getCliArgs = require('./getCliArgs');

(function(){
  const args = ['component', 'home', '--no-flow'];
  const [argLine, argFlags] = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['no-flow'] &&
    !argFlags['component'],
    'getCliArgs failed for `component home --no-flow`'
  );
})();

(function(){
  const args = ['--no-flow', 'component', 'home'];
  const [argLine, argFlags] = getCliArgs(args);

  assert(argLine[0] == 'component' &&
    argLine[1] == 'home' &&
    !argLine[2] &&
    argFlags['no-flow'] &&
    !argFlags['component'],
    'getCliArgs failed for `--no-flow component home`'
  );
})();