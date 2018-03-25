# DoMakey - automated code-creation template-framework

### /!\ Work in progress

This project is a very much a work in progress.  If you would like to contribute, please contact me!

---

## What's a 'DoMakey'

The purpose of DoMakey is to enable low-level automated code-creation for developers, to reduce boilerplate.

DoMakey is a command line interface which will call template-building scripts that you can define yourself.  These are super straight-forward.

The template-building scripts should follow an interface of an asynchronous function which takes `makey` as a parameter, and (usually) returns simple file creation instructions.

The main features of the `makey` object are:

```
const compName = await (makey.cliArgs[0] || makey.ask("Component Name:")); // from `$ domakey component HomeController`
const hasFlow = makey.ask("Would you like to enable flow typing? (y/n)", makey.PARSE_YES_NO);
// ... define compBody based on more input
makey.createFile({ fileName: `components/${compName}.jsx`, body: compBody });
hasTest && makey.createFile({ fileName: `components/${compName}.spec.jsx`, body: testBody });
```

## Why?

There were numerous, opinionated and framework-specific creation tools out there.  The patterns we use at my workplace are sort-of specific (and awesome!) and I thought why not put the 'open' back into open-source to allow folks to take control of this

## What's in store

I'm aiming for DoMakey to also parse a structured input file (json / yaml... not sure yet) and pump the input through to the script files.  In this way, a developer could set up script files (for example: for React Components, Redux reducers, action creators, stylesheets) then skeleton an app within the input file to have DoMakey magic the

I'll be adding to my own DoMakeyTpl libary along the way, firstly focused on functional React/Redux and Express / Node / Sequelize stacks.
