const readline = require('readline');
const fs = require('fs');

const printToScreen = console.log;

module.exports = {
  ask: async (question, optFlags) => new Promise((resolve, reject) => { 
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question+' ', ans => {
      resolve(ans);
      rl.close();
    });
  }),
  print: statement => {
    printToScreen(statement)
  },
  printHeading: statement => {
    printToScreen(`\n=== ${statement} ===`)
  },
  nl: () => printToScreen(""),
  createFile: ({fileName, body}) => fs.writeFileSync(fileName, body),
};
