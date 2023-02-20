const path = require('path')
const REGISTRIES = require("./registryList").default;

const HOME = 'home';
const REGISTRY = 'registry';
const NPMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.npmrc');

module.exports =  {
  NPMRC,
  REGISTRIES,
  REGISTRY,
  HOME,
}
