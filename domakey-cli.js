#!/usr/bin/env node

const domakeycore = require('./domakeycore');

const cliArgsIn = process.argv.slice(2);

if (cliArgsIn.length < 1) {
  process.stdout.write("domakey says: You must pass at least one argument to specify what to makey!\n")
  process.exit();
}

const entityName = cliArgsIn[0];

let entity;
try {
  entity = require(`./.domakey/${entityName}.dmktpl`); 
}catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
    process.stdout.write(`domakey says: I couldn't find the template ${entityName} in \`./.domakey/\`\n`)
  else
    throw e;
  process.exit();
}

try {
  entity({
    list: cliArgsIn.slice(1),//.reduce(a => a, []),
    flags: cliArgsIn.reduce((a) => a, {}),
  });
} catch (err) {
  console.log(err.message);
}
