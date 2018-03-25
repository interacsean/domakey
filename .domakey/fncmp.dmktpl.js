// TODO, use common templating language



const create = async makey => {
  const useFlow = !makey.argFlags['noflow'];

  const cmpName = await makey.cliArgs[0] || makey.ask("Component Name*:");
  if (cmpName == '') throw new Error("Component name is required");

  makey.heading("Imports");
  makey.state("Note: React import will be included automatically");

  let importBuilder = [];
  let importBuilder_tempWhat;
  let importBuilder_tempWhere;
  do {
    importBuilder_tempWhat = await makey.ask("import {what} ...: ");
    if (!importBuilder_tempWhat !== ''){
      importBuilder_tempWhere = await ask(`import ${importBuilder_tempWhat} from '{where}';`);
      if (!importBuilder_tempWhere !== '')
        importBuilder.push(`import ${importBuilder_tempWhat} from '${importBuilder_tempWhere}';`);
      else
        proacter.state('(where not given, ${importBuilder_tempWhat} not added)');
    }
      
  } while (importBuilder.length > 0 && importBuilder_tempWhere !== '');

  
  const flowStatement = useFlow
    ? "// @flow\n\n"
    : '';
  const importStatements = ["import React from \'react\';"].concat(importBuilder).join("\n") + "\n";


  makey.heading("Components to use");
  makey.state("");

  do {
    importBuilder_temp = await makey.ask("import {what} ...: ");
    if (!importBuilder_temp !== ''){
      importBuilder.push(`import ${importBuilder_temp} from '{where}';`);
  } while (importBuilder.length > 0 && importBuilder_temp !== '');

  // set flow type definitions for things

  const returnJsx = "<div></div>";

  const tmpl = `${flowStatement}${importStatements}

const ${cmpName} = (props) => {
  return (
    ${returnJsx}
  );
}

export default ${cmpName};
`;

  makey.createFile({
    fileName: `components/${cmpName}.view.js`,
    body: tmpl,
  })

  // ask about generators

  // ask about enhancers

}

module.exports = create;