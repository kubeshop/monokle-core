const fs = require('fs');
const path = require('path');

const packageMjs = path.join(__dirname, '../lib/mjs/package.json');
fs.writeFileSync(packageMjs, JSON.stringify({type: "module"}, null, 2));

const packageCjs = path.join(__dirname, '../lib/cjs/package.json');
fs.writeFileSync(packageCjs, JSON.stringify({type: "commonjs"}, null, 2));
