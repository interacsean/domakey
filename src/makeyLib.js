const readline = require('readline');
const fs = require('fs');
const path = require('path');
const io = require('./io');

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
  print: (statement) => {
    io.printToTerminal(statement)
  },
  printHeading: statement => {
    io.printToTerminal(`\n=== ${statement} ===`)
  },
  nl: () => io.printToTerminal(""),
  createFile: (fileName, body) => {
    /*
     * Note, createFile used to take a single parameter, an object with {fileName, body} keys
     * The below ~6 lines provide backwards compatibility
     **/
    const useFileName = typeof body === 'undefined' && typeof fileName.fileName === 'string'
      ? fileName.fileName
      : fileName;

    const useBody = typeof body === 'undefined' && typeof fileName.body === 'string'
      ? fileName.body
      : body;

    try {
      const filePath = path.dirname(useFileName);
      if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath);
      }
      fs.writeFileSync(useFileName, useBody);
      return true;
    } catch (e) {
      io.printToTerminal(e);
      return false;
    }
  },
  editFile: async (fileName, editFn) => {
    try {
      const origContent = fs.readFileSync(fileName).toString();
      const changedContent = await editFn(origContent);
      if (changedContent !== false) {
        const filePath = path.dirname(fileName);
        if (!fs.existsSync(filePath)){
          fs.mkdirSync(filePath);
        }
        fs.writeFileSync(fileName, changedContent);
      }
      return true;
    } catch (e) {
      io.printToTerminal(e);
      return false;
    }
  },
  templateReplace: (template, replacements) => {
    const arrSearch = Object.keys(replacements);
    const arrReplace = Object.values(replacements);
    return arrSearch.reduce((accTmpl, search, i) => {
      const rgx = new RegExp(`{{${search}}}`, 'g');
      return accTmpl.replace(rgx, arrReplace[i]);
    }, template);
  },
  camelToSnakeCaps: camel => {
    const upperChars = camel.match(/([A-Z])/g);
    if (! upperChars) {
      return camel.toUpperCase();
    }

    let snake = camel;
    for (let i = 0, n = upperChars.length; i < n; i++) {
      snake = snake.replace(new RegExp(upperChars[i]), '_' + upperChars[i]);
    }

    if (snake.slice(0, 1) === '_') {
      snake = snake.slice(1);
    }

    return snake.toUpperCase();
  },
  camelToKebab: camel => {
    const upperChars = camel.match(/([A-Z])/g);
    if (! upperChars) {
      return camel.toLowerCase();
    }

    let snake = camel;
    for (let i = 0, n = upperChars.length; i < n; i++) {
      snake = snake.replace(new RegExp(upperChars[i]), '-' + upperChars[i]);
    }

    if (snake.slice(0, 1) === '_') {
      snake = snake.slice(1);
    }

    return snake.toLowerCase();
  },
  toUpperCaseFirst: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  toLowerCaseFirst: function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  },
};
