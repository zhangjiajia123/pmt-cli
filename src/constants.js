import { join } from 'path';
import REGISTRIES from './registryList.js';

const HOME = 'home';
const REGISTRY = 'registry';
const REPOSITORY = 'repository';
const NRMRC = join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
const NPMRC = join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.npmrc');

export {
  NRMRC,
  NPMRC,
  REGISTRIES,
  REPOSITORY,
  REGISTRY,
  HOME,
};
