#!/usr/bin/env node

/** To-do:
 * • [_] Bug: 
 * • [_] Specify --help interface
 * • [_] Allow to pass in a template via '-f' or '< fileName.yaml'
 * • [_] domakeycore to take flags for parsing questions for y/n, for eg.
 */

const domakeycore = require('./lib/domakeycore');
const getCliArgs = require('./lib/getCliArgs');

const { line: cliArgsLine, flags: cliArgsFlags } = getCliArgs(process.argv.slice(2));

if (cliArgsLine < 1) {
  process.stdout.write("domakey says: You must pass at least one argument to specify what to makey!\n")
  process.exit();
}

const entityName = cliArgsLine[0];
try {
  const entity = require(`${process.cwd()}/.domakey/${entityName}.dmktpl`); 
  entity({
    name: entityName,
    list: cliArgsLine.slice(1),
    flags: cliArgsFlags,
    makey: domakeycore,
  });

} catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
    process.stdout.write(`domakey says: I couldn't find the template ${entityName} in \`${process.cwd()}/.domakey/\`\n`)
  else
    throw e;
  process.exit();
}
