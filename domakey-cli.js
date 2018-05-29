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
const fileNames = [`${entityName}.js`, entityName];
let entity = fileNames.reduce((acc, fileName) => {
  if (acc.isRight) return acc;
  try {
    const incEntity = require(`${process.cwd()}/.domakey/${entityName}`);
    return { isRight: true, val: incEntity };
  } catch (e) {
    return { isRight: false, val: e };
  }
}, {isRight: false, val: null});

const completed = ((entity) => {
  if (entity.isRight) {
    try {
      entity.val({
        name: entityName,
        list: cliArgsLine.slice(1),
        flags: cliArgsFlags,
        makey: domakeycore,
      });
      return { isRight: true, val: 'completed' };
    } catch (e) {
      return { isRight: false, val: e };
    }
  }
  return entity;
}).call(null, entity);

if (!completed.isRight) {
  process.stdout.write(
    (completed.val instanceof Error && completed.val.code === "MODULE_NOT_FOUND")
      ? `domakey says "I couldn't find any matching template name ${entityName} in \`${process.cwd()}/.domakey/\`"\n\n`
      : `domakey says: "Unexpected error, ${completed.val.message}"\n\n`
  );
  process.exit();
}
