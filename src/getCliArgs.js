
module.exports = orig => ({
  line: orig.filter(arg => arg[0] !== '-'),
  flags: (orig => {
    let flagObj = {};
    orig.forEach(arg => {
      if (arg.substr(0, 5) == '--no-') {
        flagObj[arg.substr(5)] = false;
      } else if (arg.substr(0, 2) === '--') {
        flagObj[arg.replace(/^-*/g, '')] = true;
      }
    });
    return flagObj;
  })(orig),
});
