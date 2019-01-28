/**
 * dmktmpl: Template creator
 */
const tmplBody = `const tmplBody = \`// My template code
\`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('My first question:'));
  
  //  Your code here >>>
  const bodyFilled = tmplBody;
  // <<<
  
  makey.createFile(
    \`./src/\${fileName}.js\`,
    bodyFilled,
  );
}
`;

module.exports = async ({ cliArgs, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('Template filename:'));

  makey.createFile(
    `.domakey/${fileName}.js`,
    tmplBody.replace(/%fileName%/g, fileName),
  );
};
