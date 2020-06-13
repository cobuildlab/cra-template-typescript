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
  execSync(`git clone https://github.com/cobuildlab/create-react-typescript-app.git ${finalPath}`);
  console.log("create-react-typescript-app:\n Changing dir to: ", finalPath);
  process.chdir(finalPath);
  console.log("create-react-typescript-app:\n Borrando archivos innecesarios...",);
  rimraf.sync("./.git");
  rimraf.sync("./.github");
  rimraf.sync("./.gitignore");
  rimraf.sync("./.npmignore");
  rimraf.sync("./README.md");
  rimraf.sync("./package.json");
  rimraf.sync("./package-lock.json");
  rimraf.sync("./index.js");

  console.log("create-react-typescript-app:\n Renombrando la carpeta 'template' a 'docs' para evitar fallas en 'cra'...",);
  execSync(`mv template docs`);

  // En este punto solo que la carpeta /docs
  console.log("create-react-typescript-app:\n Volvemos al directorio previo: ", originalPath);
  process.chdir(originalPath);
  console.log("create-react-typescript-app:\n running create-react-app");
  try {
    execSync(`npx create-react-app ${name} --template typescript`);
  }catch (e) {
    console.log("create-react-typescript-app:\n create-react-app fallo:.", e);
    process.exit(1);
  }
  console.log("create-react-typescript-app:\n create-react-app exitoso...");
  console.log("create-react-typescript-app:\n entramos al directorio...");
  process.chdir(finalPath);

  // Mover template
  const templatePath = path.join(finalPath, "docs")
  console.log("create-react-typescript-app:\n Moviendo el contenido del template:", finalPath, templatePath);
  execSync(`mv ${templatePath}/{,.[^.]}* ${finalPath}`);
  console.log("create-react-typescript-app:\n Removing 'template' folder...",);
  rimraf.sync("./docs");
  // Instalar dev dependecies
  console.log("create-react-typescript-app:\n Instalando nuevas dependencias con NPM... (Esto puede demorar)");
  execSync(`npm i --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-import eslint-plugin-jest eslint-plugin-jsdoc eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks husky lint-staged prettier prettier-eslint eslint-plugin-cypress`);
  execSync(`npm i --save-dev @types/jest @types/node @types/react @types/react-dom`);

  // añadir husky y lint staged all package.json
  const packageJson = require('./package.json');

  packageJson["husky"] = {
    "hooks": {
      "pre-commit": "npm run build && npm run test && lint-staged"
    }
  };
  packageJson["lint-staged"] = {
    "*.{js,ts,tsx,jsx}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  };

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);

  rl.close();
});

rl.on("close", function () {
  console.log("\nENJOY !!!");
  process.exit(0);
});
