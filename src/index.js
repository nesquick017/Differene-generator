import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import formatDiff from './formatters/index.js';
import buildTree from './buildTree.js';

const getFixturePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getType = (filepath) => path.extname(filepath).slice(1);
export { getFile, getType, getFixturePath };

export default function genDifference(fileName1, fileName2, format = 'stylish') {
  const file1 = parser(getFile(getFixturePath(fileName1)), getType(getFixturePath(fileName1)));
  const file2 = parser(getFile(getFixturePath(fileName2)), getType(getFixturePath(fileName1)));
  return formatDiff(buildTree(file1, file2), format);
}
