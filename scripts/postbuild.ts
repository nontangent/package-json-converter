import * as fs from 'fs';
import * as path from 'path';

async function postinstall() {
  const PACKAGE_JSON_SOURCE = path.join(__dirname, '../package.json');
  const PACKAGE_JSON_DIST = path.join(__dirname, '../dist/package.json');
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_SOURCE).toString());
  delete packageJson['scripts'];
  delete packageJson['devDependencies'];
  fs.writeFileSync(PACKAGE_JSON_DIST, JSON.stringify(packageJson, undefined, '\t'));
}

postinstall();