// parcel.config.js
const { resolveConfig } = require('dotenv-expand');
const dotenv = require('dotenv');

module.exports = function (bundler) {
  const env = dotenv.config();
  resolveConfig(env);
};
