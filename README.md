## Technology Stack

|               | Nombre     | Versión |
| ------------- | ---------- | ------- |
| **Language**  | Typescript | ^4.8.4  |
| **Framework** | vuejs      | ^3.2.31  | 


## Requirements

NodeJS | v19.1.0

## Recommended IDE setup

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Typescript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)

## Installation
The installation is very simple and consists of a single command, when executed, automatically will install Husky, which is a hooks handler that will be executed after certain rules established in the package.json

```
npm i
```


## ESLint
Every time a commit is made the husky hook will run the lint and unit testing. But you can also do it manually with:

```
npm run lint
```

## Unit Testing (Vitest)
Vitest is used for unit testing. Vitest allows us to use the same vite.config.ts for configuration. The unit tests go in the /test folder in the root of the project with extension .test.ts.
To run them we use the following command to run in Watch mode.

```
npm run test
```

To get a code-coverage:

```
npm run coverage
```

This will tell us the code-coverage in the terminal and will create a coverage folder where we have the same information but with UI.

## Known errors

 At the moment of obtaining a code-coverage it will mark that there is a line not covered in the 111 of CalculatorPage, this is a library error, specifically C8 with Vitest, caused by the closing of braces.
