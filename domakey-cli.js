#!/usr/bin/env node

const domakeycore = require('./domakeycore');

const cliArgsIn = process.argv.slice(2);

if (cliArgsIn.length < 1) {
  process.stdout.write("domakey says: You must pass at least one argument to specify what to makey!")
  process.exit();
}

const entityName = cliArgsIn[0];

// TODO: if !exists('.domakey/'+entityName) process.exit();
  
const entity = require(`./.domakey/${entityName}.dmktpl`);

try {
  entity({
    list: cliArgsIn.slice(1),//.reduce(a => a, []),
    flags: cliArgsIn.reduce((a) => a, {}),
  });
} catch (err) {
  console.log(err.message);
}
