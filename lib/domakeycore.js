const readline = require('readline');
const fs = require('fs');

const printToScreen = console.log;

const ask = (question, optFlags) => new Promise((resolve, reject) => { 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(question+' ', ans => {
    resolve(ans);
    rl.close();
  });
});

module.exports = {
  ask,
  askYN: async (question, defaultYes = true) => {
    const ans = await ask(
      question
      + ' ' + (defaultYes ? '(Y/n)':'(y/N)')
    );
    return (ans.toLowerCase()[0] == 'y' || (ans === '' && defaultYes));
  },
  print: statement => {
    printToScreen(statement)
  },
  printHeading: statement => {
    printToScreen(`\n=== ${statement} ===`)
  },
  nl: () => printToScreen(""),
  createFile: ({fileName, body}) => fs.writeFileSync(fileName, body),
};
