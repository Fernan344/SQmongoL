const fs = require('fs');
const path = require('path');
const os = require('os');

export const buildDirectoryTree = async (dir) => {
  const directoryName = dir && Array.isArray(dir) ? path.join(...dir) : (dir || os.homedir())
  
  const stats = fs.statSync(directoryName);
  
  if (stats.isDirectory()) {
    const items = fs.readdirSync(directoryName, {withFileTypes: true}).filter(i => i.isDirectory() && i.name[0] !== '.');
    const tree = {dir: directoryName, items: items};
    return tree;
  }

  return null;
}