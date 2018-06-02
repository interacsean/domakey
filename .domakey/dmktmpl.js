/**
 * dmktmpl: Template creator
 */
const tmplBody = `/**
* My template
*/
const tmplBody = \`// My template code
\`;

module.exports = async ({cliArgs, cliFlags, templateName, makey}) => {
 const fileName = cliArgs[0] || (await makey.ask('My first question:'));

 //  Your code here >>>
 const bodyFilled = tmplBody;
 // <<<

 makey.createFile({
   fileName: \`./src/\${fileName}.js\`,
   body: bodyFilled,
 });
}
`
module.exports = async ({cliArgs, makey}) => {
  const fileName = cliArgs[0] || (await makey.ask('Template filename:'));

  makey.createFile({
    fileName: `.domakey/${fileName}.js`,
    body: tmplBody.replace(/%fileName%/g, fileName),
  })
}
