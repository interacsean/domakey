const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('So...? ', ans => process.stdout.write(ans));

module.exports = {
  ask: async (question, optFlags) => new Promise((resolve, reject) => {
      rl.question(question+' ', ans => {
        resolve(ans);
        rl.close();
      });
    }),
  state: statement => process.stdout.write(statement),
  heading: statement => process.stdout.write(`=== ${statement} ===`),
  createFile: ({fileName, body}) => {
    // TODO create file
  }
};
