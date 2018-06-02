#!/usr/bin/env node

/** To-do:
 * • [_] createFile to create directories if needed
 * • [_] createFile to check if file exists, and ask to overwrite first
 * • [_] teeests
 * • [_] Specify --help interface
 * • [_] Allow to pass in a template via '-f' or '< fileName.yaml'
 * • [_] domakeycore.ask to take flags for parsing questions for y/n
 */
const fs = require('fs');
const domakeycore = require('./makeyLib');
const getCliArgs = require('./getCliArgs');

const { line: cliArgsLine, flags: cliArgsFlags } = getCliArgs(process.argv.slice(2));

if (cliArgsLine < 1) {
  process.stdout.write("domakey says: You must pass at least one argument to specify what to makey!\n")
  process.exit();
}

const templateName = cliArgsLine[0];
const fileNames = [
  `${process.cwd()}/.domakey/${templateName}.js`,
  `${process.cwd()}/.domakey/${templateName}`,
  `${__dirname}/../.domakey/${templateName}.js`,
  `${__dirname}/../.domakey/${templateName}`,
];
const templateFn = fileNames.reduce((acc, fileName) => {
  if (acc.isRight || (acc.val && (acc.val || {}).code !== 'MODULE_NOT_FOUND')) return acc;
  try {
    return fs.existsSync(fileName)
      ? { isRight: true, val: require(fileName) }
      : { isRight: false, val: `I couldn't find any matching template name ${templateName} in \`${process.cwd()}/.domakey/\``};
  } catch (e) {
    return { isRight: false, val: e };
  }
}, {isRight: false, val: null});

const calledEntity = ((templateFn) => {
  if (templateFn.isRight) {
    if (typeof templateFn.val !== 'function') {
      return Promise.resolve({
        isRight: false,
        val: 'Template does not export a valid function',
      });
    }

    try {
      return templateFn.val({
        templateName: templateName,
        cliArgs: cliArgsLine.slice(1),
        cliFlags: cliArgsFlags,
        makey: domakeycore,
      }).then(function () {
        return { isRight: true, val: 'completed' };
      }).catch(function (e) {
        return { isRight: false, val: e.message };
      });
    } catch (e) {
      return Promise.resolve({ isRight: false, val: e });
    }
  }
  return Promise.resolve(templateFn);
})(templateFn)
  .then(function (completed) {
    if (!completed.isRight) {
      process.stdout.write(`domakey says "${completed.val}"\n\n`);
      if (completed.val instanceof Error) {
        console.log(completed.val);
      }
      process.exit();
    }
  });
