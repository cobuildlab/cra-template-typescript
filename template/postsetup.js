const fs = require('fs');
const path = require('path');

/**
 * Removes the post installation scripts from the Package.json
 */
function cleanupAfterSetup() {
  console.log('Post setup cleanup');

  const packageJsonPath = path.join(__dirname + '/package.json');
  const packageJsonFile = require(packageJsonPath);

  // Remove post installation scripts
  delete packageJsonFile.scripts["install:deps"];
  delete packageJsonFile.scripts["install:devdeps"];
  delete packageJsonFile.scripts["install:types"];
  delete packageJsonFile.scripts["setup"];
  delete packageJsonFile.scripts["cleanup"];
  delete packageJsonFile.scripts["postinstall"];

  const stringifiedPackageJson = JSON.stringify(packageJsonFile, null, 2);

  function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + packageJsonPath);
  }

  // Update package.json
  fs.writeFile(packageJsonPath,stringifiedPackageJson, writeJSON);

  // Remove postsetup.js
  fs.unlinkSync(path.join(__dirname + '/postsetup.js'));
}

try {
  cleanupAfterSetup()
} catch (error) {
  console.error(error);
}
