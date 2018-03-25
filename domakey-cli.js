#!/usr/bin/env node

const [,, cliArgsIn] = process.argv;

if (cliArgsIn.length < 1) {
  process.exit();
}

const entityName = cliArgsIn[0];

// TODO: if !exists('.domakey/'+entityName) process.exit();

const entity = require(`./.domakey/${entityName}`);

// takes args and splits out flags
const argFlags = cliArgs => {

}

const argsList = cliArgsInqreduce(() => void, []);
const flags = cliArgsIn.reduce(() => void, []);

try {
  entity({
    argsList,
    flags,
    ask: (question, optFlags) => {
      // TODO query the cli
    },
    state: statement => {
      // TODO just output to io
    }
    heading: statement => {
      return `=== ${statement} ===`;
      // TODO just output to io
    }
    createFile: {fileName, body} => {
      // TODO create file
    }
  })
} catch (err) {
  console.log(err.message);
}
