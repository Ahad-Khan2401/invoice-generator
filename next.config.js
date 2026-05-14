// next.config.js
const path = require('path');
require('ts-node').register({
  transpileOnly: true,
  project: path.resolve(__dirname, 'tsconfig.json')
});

const config = require('./next.config.ts');

module.exports = config.default ?? config;