import * as program from 'commander';
import { join, dirname } from 'path';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { cwd } from 'process';

program
.arguments('<dest>')
.option('-s, --src', 'source package.json path')
.action((dest: string, options: {src: string}) => {
  const BASE_PATH = cwd();
  const src = options.src || join(BASE_PATH, 'package.json');
  dest = dest || join(BASE_PATH, 'dist', 'package.json');

  convertPackageJson(src, dest);
})
.parse();

async function convertPackageJson(src: string, dest: string) {
  const origin = readFileSync(src).toString();
  const converted = _convertPackageJson(origin);

  if (!existsSync(dirname(src))) mkdirSync(dirname(src), {recursive: true});
  writeFileSync(dest, converted);
}

function _convertPackageJson(src: string): string {
    const packageJson = JSON.parse(src);
    delete packageJson['scripts'];
    delete packageJson['devDependencies'];
    packageJson['main'] = 'main.js';
    packageJson['engines'] = {'node': '12'};
    return JSON.stringify(packageJson, null , '\t');
}