# Cobuild Lab Typescript Template with Create React App

To use this template, add `--template @cobuildlab/typescript` when creating a new app.

For example:

```bash
npx create-react-app my-app-name --template @cobuildlab/typescript
```

## Initial Setup

The current iteration of CRA (3.4.1) fails to initialize the Git repository when Husky hooks are already installed.
Therefore the hooks' automatic installation has been disabled.

After the template installation setup finishes, `cd` into the project and run the following command to install the Husky hooks:

```bash
npm rebuild
```

Now everything is ready to go.

## For more information

- [Conventions to create React apps](https://cobuildlab.com/development-blog/conventions-to-create-a-react-application)
- [Conventions for JavaScript & TypeScript code](https://cobuildlab.com/development-blog/conventions-for-javascript-typescript-source-code)
- [Effective Programming Conventions](https://cobuildlab.com/development-blog/effective-programming-at-cobuildlab)
- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
