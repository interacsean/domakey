# DoMakey - automated code-creation scripting framework

### /!\ Work in progress

This project is a very much a work in progress.  If you would like to contribute, please contact me!

---

## What's a 'DoMakey'

The purpose of DoMakey is to enable low-level, automated code-creation for developers, to reduce time spent setting up boilerplate code.

DoMakey is a command line interface which will call template-building scripts you define yourself.  (These are super straight-forward, don't freak)

The template-building scripts should export an asynchronous function which takes an `args` object as a single parameter to access cli args, and will utilise the domakey library to perform IO operations

The main features of the `makey` object are:

```
// File: component.dmktpl.js

const compName = await (makey.cliArgs[0] || makey.ask('Component Name:'));
// reads from cli args: `$ domakey component HomeController`

const hasFlow = await makey.askYN('Would you like to enable flow typing?');
// prompts 'Would you like to enable flow typing? (Y/n)' and casts to boolean

// ... code to define `compBody`, and possibly `testBody` based on more user input

makey.createFile({ fileName: `components/${compName}.jsx`, body: compBody });
componentHasTest && makey.createFile({ fileName: `components/${compName}.spec.jsx`, body: testBody });
```

That is literally enough to get you started.

## Why?

There were numerous, opinionated and framework-specific creation tools out there.  The patterns we use at my workplace are sort-of particular (and awesome!), and I thought why not put the 'open' back into open-source to allow folks to take control of this.

## What's in store

I'm aiming for DoMakey to also parse a structured input file (json / yaml... not sure yet) and batch pump the input through to the script files.  In this way, a developer could set up script files (for example: for React Components, Redux reducers, action creators, stylesheets) then skeleton an app within the input file to have DoMakey magic up the general app framework.  Then you code out the logic without getting sidetracked on following formatting procedures.

I'll be adding to my own DoMakeyTpl libary along the way, firstly focused on functional React/Redux and Express / Node / Sequelize stacks.  Maybe some good samaratin could help provide Angular / Vue stack templates.
