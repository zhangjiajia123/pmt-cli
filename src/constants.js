import { join } from 'path';
import REGISTRIES from './registryList.js';

const HOME = 'home';
const REGISTRY = 'registry';
const NPMRC = join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.npmrc');

export {
  NPMRC,
  REGISTRIES,
  REGISTRY,
  HOME,
};
