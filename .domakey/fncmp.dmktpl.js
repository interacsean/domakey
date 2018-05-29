const create = async args => {
  const makey = args.makey;
  const useFlow = args.flags['use-flow'];
  const cmpName = await (args.list[0] || makey.ask("Component Name*:"));

  if (cmpName == '') throw new Error("Component name is required");

  makey.printHeading("Add any imports (enter blank to skip)");
  makey.print("  `import React from 'react';` is included automatically");
  makey.nl();
  makey.print("Answer for the following placeholders:")
  makey.print("  `import {what} from '{where}';`");

  let importBuilder = [];
  let importBuilder_tempWhat;
  let importBuilder_tempWhere;
  let importStmt;
  do {
    importBuilder_tempWhat = await makey.ask("import {what}: ");
    if (importBuilder_tempWhat !== ''){
      importBuilder_tempWhere = await makey.ask(` ... from '{where}';: `);
      if (importBuilder_tempWhere !== ''){
        importStmt = `import ${importBuilder_tempWhat} from '${importBuilder_tempWhere}';`;
        importBuilder.push(importStmt);
        makey.print(` - Added: \`${importStmt}\``);
      }else{
        makey.print('(where not given for: ${importBuilder_tempWhat}, not added)');
      }
    }else{
      importBuilder_tempWhere = '';
    }
  } while (importBuilder.length > 0 && importBuilder_tempWhere !== '');

  const flowStatement = useFlow
    ? "// @flow\n\n"
    : '';
  const importStatements = ["import React from \'react\';"].concat(importBuilder).join("\n");

  // set flow type definitions for things

  const tmpl = `${flowStatement}${importStatements}

const ${cmpName} = (props) => {
  return (
    <div></div>
  );
}

export default ${cmpName};
`;

  makey.createFile({
    fileName: `components/${cmpName}.view.js`,
    body: tmpl,
  });

  // ask about generators

  // ask about enhancers

}

module.exports = create;
