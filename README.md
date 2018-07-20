# DoMakey - automated code-creation scripting framework

## What's a 'DoMakey'

The purpose of DoMakey is to enable automated code-creation for developers, thus reducing time spent setting up boilerplate code.

DoMakey is a command line interface which calls template-building scripts you write yourself.  (These are super straight-forward, don't freak.)

The key features of `makey` examplified here:

```
// File: /.domakey/component.js

module.exports = async ({ cliArgs, makey }) => {
  // Read from passed cli param: `$ domakey component HomePage`
  const compName = cliArgs[0];

  // Ask for user input:
  const pageTitle = await makey.ask('Component\'s page title:');

  // Ask and cast y/n response to boolean
  const componentHasTest = await makey.askYN('Would you like to add a test?');

  // ... define `compBody`, and possibly `testBody`

  makey.createFile({
    fileName: `components/${compName}.jsx`,
    body: compBody,
  });

  componentHasTest && makey.createFile({
    fileName: `components/${compName}.spec.jsx`,
    body: testBody,
  });
}
```

## Installation

**Option 1.  Install globally**
`npm install -g domakey`

Run with: `domakey tmplName param1 param2`

**Option 2. Install locally**

Best to save it as a devDependency in your project, with -D or --save-dev

 `npm install -D domakey`

Run with: `npm run domakey -- tmplName param1 param2`

or w/ yarn: `yarn domakey tmplName param1 param2`

### Get started:
Run `domakey dmktmpl myNewTemplate` to create a boilerplate template at `/.domakey/myNewTemplate.js`

## Documentation

### CLI arguments

`domakey <tmplName> [<params>...]`

Where...

`tmplName` is a script filename (with or without '.js' extension) within the `/.domakey/` directory

`params` are arbitrary, repeatable parameters to be passed to your script.

Any argument preceeded by two dashes (`--`) will be cast to boolean; if starting with '`--no-`', it will become false, otherwise true.  These can be passed anywhere after the script name parameter (order has no effect.)

**For example:**

`domakey parser --ignore-whitespace --no-overwrite json html` will run `/.domakey/parser.js`.  The function in parser.js will receive the following argument:

```
{
  templateName: "parser",
  cliArgs: ["json", "html"],
  cliFlags: {
    "ignore-whitespace": true,
    "overwrite": false,
  },
  makey: makeyLibraryObj, //*see note
}
```
*\*The* makey *parameter is always present and is described below.*

### Template files

**You will need to create a directory `.domakey` at your project root level**

In /.domakey, your template-building scripts should export a single asynchronous function which takes an object as a single argument.

The argument will be passed with the following keys:

**Template Argument Object**

Key Name                | Description
-------------           | -------------
`templateName`          | The name of the script being run.  (Should always mirror the filename, but is available nonetheless.)
`cliArgs`               | Array of subsequent parameters passed to the cli after the script name.  Excludes params starting with '`--`'.
`cliFlags`              | Object of cli arguments which started with '`--`'.  See 'CLI argments' section.
`makey`\*\*               | The 'makey' library object used to perform IO interactions such as asking questions or creating files.  (See 'makey' section below.)

*\*\*You can opt to include* `const makey = require('makey');` *at the top of your template files, instead of using the passed param key.  Up to you.*

**Quickstart tip:** Run `domakey dmktmpl myNewTemplate` to create a boilerplate template at `/.domakey/myNewTemplate.js`

### The *makey* interface

The functions available in the `makey` object are listed here.

**ask**
Render text to the console and await user response.

*Parameters*
 - `question` (string) - the text to render to screen.

*Returns*
 - `Promise<string>` - The text the user entered.  Empty string if user just hits 'enter'.

```
const strFaveFruit = await makey.ask('What\'s your favourite fruit?');
```

**askYN**
Render text to the console, adding " (Y/n) ", and awaits a user response which is cast to boolean.

*Parameters*
 - `question` (string) - The text to render to screen.
 - `default` (boolean, defaults to true) - What should be the default value if the user just hits 'enter'; Y (true) / N (false).

*Returns*
 - `Promise<boolean>` - true if the user responded 'y', false if 'n'.  An empty response returns the default.

```
const boolIsCool = await makey.askYN('Do you think I\'m cool?');
```

**print**
Prints text to screen.  A new line is automatically added afterwards.

*Parameters*
 - `text` (string) - The text to render to screen.

```
makey.print('Now hear this');
```

**printHeading**
Prints text to screen in `=== my heading ===`

*Parameters*
 - `text` (string) - The text to render to screen as heading.

```
makey.print('Testing options');
// renders: "\n=== Testing options ==="
```

**nl**
Prints a new line only

*No Parameters*

`nl();`

**createFile**
Write a new file.

*Parameters*
 - `fileName` (string) - The path, relative to execution, of the file to create
 - `body` (string) - The contents of the file

*Returns*
 - `boolean` - true if successfully written.

```
const boolWriteSuccess = createFile(
  `src/bandits/${banditNameVar}.js`,
  banditBioVar,
);
```

**editFile**
Amend an existing file.

*Parameters*
 - `fileName` (string) - The path, relative to execution, of the file to create
 - `callback` (function) - A function which is called with a single parameter: the existing content of the file.  This callback should return the new contents of the file as a string.  If the callback returns `false`, the file will not be changed.

*Returns*
 - `boolean` - true if successfully edited.

```
const boolWriteSuccess = editFile(
  fileName: `src/bandits/${banditNameVar}.js`,
  edit: existingBody => `${existingBody}${banditExportLine};\n`,
);
```

---
*(end of documentation)*

## Why?

There were numerous, opinionated and framework-specific creation tools out there.  The patterns we use at my workplace are sort-of particular (and awesome!), and I thought why not put the 'open' back into open-source to allow folks to take control of this.

## What's in store

I'm aiming for DoMakey to also parse a structured input file (json / yaml... not sure yet) and batch pump the input through to the script files.  In this way, a developer could set up script files (for example: for React Components, Redux reducers, action creators, stylesheets) then skeleton an app within the input file to have DoMakey magic up the general app framework.  Then you code out the logic without getting sidetracked on following formatting procedures.

I'll be adding to my own DoMakey template libary along the way, firstly focused on functional React/Redux and Express / Node / Sequelize stacks.  Maybe some good samaratin could help provide Angular / Vue stack templates.
