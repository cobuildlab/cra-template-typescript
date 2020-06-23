#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");
const {execSync} = require('child_process');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const os = require('os');


rl.question(`create-react-typescript-app:\n Input the name of your project (this will be the folder created for it): \n `, function (name) {
  if (!name) {
    console.log("create-react-typescript-app:\n No name, exiting script...");
    rl.close();
  }
  const originalPath = process.cwd();
  const finalPath = path.join(originalPath, name);
  console.log("create-react-typescript-app:\n Cloning the first template...");
  execSync(`git clone https://github.com/cobuildlab/create-react-typescript-app.git ${finalPath}`, {stdio: 'inherit'});
  console.log("create-react-typescript-app:\n Changing dir to: ", finalPath);
  process.chdir(finalPath);
  console.log("create-react-typescript-app:\n Removing unnecessary files...",);
  rimraf.sync("./.git");
  rimraf.sync("./.github");
  rimraf.sync("./.gitignore");
  rimraf.sync("./.npmignore");
  rimraf.sync("./README.md");
  rimraf.sync("./package.json");
  rimraf.sync("./package-lock.json");
  rimraf.sync("./index.js");
  //
  console.log("create-react-typescript-app:\n Renaming 'template' folder to 'docs' to avoid any problems with create-react-app script...",);
  execSync(`mv template docs`, {stdio: 'inherit'});
  //
  // En este punto solo que la carpeta /docs
  console.log("create-react-typescript-app:\n Going back to the original directory...: ", originalPath);
  process.chdir(originalPath);
  console.log("create-react-typescript-app:\n running create-react-app:");
  try {
    execSync(`npx create-react-app ${name} --template typescript`, {stdio: 'inherit'});
  } catch (e) {
    console.log("create-react-typescript-app:\n create-react-app fails::.", e);
    process.exit(1);
  }
  console.log("create-react-typescript-app:\n create-react-app successful...");
  console.log("create-react-typescript-app:\n Going back to the project directory...");
  process.chdir(finalPath);
  //
  // Move template
  const templatePath = path.join(finalPath, "docs")
  console.log("create-react-typescript-app:\n Copying the content of the template folder to the project folder:", finalPath, templatePath);
  execSync(`cp -a ${templatePath}/. ${finalPath}/`, {stdio: 'inherit'});
  console.log("create-react-typescript-app:\n Deleting 'docs' folder...",);
  rimraf.sync("./docs");
  rimraf.sync("./yarn.lock");
  // // Install dependencies
  console.log("create-react-typescript-app:\n Running 'npm i'... (this may take a while)");
  execSync(`npm i`, {stdio: 'inherit'});
  execSync(`npm i --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jest eslint-plugin-jsdoc eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks husky lint-staged prettier eslint-plugin-cypress`, {stdio: 'inherit'});
  execSync(`npm i --save-dev @types/jest @types/node @types/react @types/react-dom @babel/preset-react @babel/preset-typescript`, {stdio: 'inherit'});

  // console.log("create-react-typescript-app:\n Adding Husky and Lint Staged to the 'package.json'");
  const packageJson = require(path.join(finalPath, './package.json'));

  packageJson["scripts"].eslint = "eslint --ext .ts,.tsx ./src";

  packageJson["husky"] = {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test && npm run build"
    }
  };
  packageJson["lint-staged"] = {
    "*.{js,ts,tsx,jsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  };

  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2) + os.EOL);

  rl.close();
});

rl.on("close", function () {
  console.log("create-react-typescript-app:\n DONE!, enjoy your coding!");
  process.exit(0);
});
