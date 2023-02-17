import { existsSync, readFileSync, writeFileSync } from 'fs'
import { parse, stringify } from 'ini'
import { NPMRC, REGISTRY, REGISTRIES } from './constants.js'
import fetch from 'node-fetch'

function exit(err) {
  console.error("error: " + err);
  process.exit(1);
}
// 获取.npmrc中的镜像源
async function readFile(file) {
  return new Promise((resolve) => {
    // 判断路径是否有效
    if (!existsSync(file)) {
      resolve({});
    } else {
      try {
        const content = parse(readFileSync(file, 'utf-8'));
        resolve(content);
      } catch (error) {
        exit(error);
      }
    }
  })
}
// 获取当前镜像
async function getCurrentRegistry() {
  const npmrc = await readFile(NPMRC);
  return npmrc[REGISTRY];
}

// 判断切换的源是否存在
async function isFindRegistry(name) {
  return new Promise(resolve => {
    const isFlag = REGISTRIES.some(list => {
      if(list.name === name) {
        return true
      }
      return false
    })
    resolve(isFlag)
  })
}

// 修改源
async function writeFile(path, content) {
  return new Promise(resolve => {
    try {
      writeFileSync(path, stringify(content));
      resolve();
    } catch (error) {
      exit(error);
    }
  });
}

async function registryTests(sources) {
  const timeout = 5000;
  return new Promise(async resolve => {
    const results = await Promise.all(sources.map(async source => {
      const registry = source.registry;
      const start = Date.now();
      let status = false;
      let isTimeout = false;
      try {
        const response = await fetch(registry, { timeout });
        status = response.ok;
      } catch (error) {
        isTimeout = error.type === 'request-timeout';
      }
      return {
        name: source.name,
        registry,
        success: status,
        time: Date.now() - start,
        isTimeout
      };
    }));
    resolve(results)
  })
}

export {
  readFile,
  getCurrentRegistry,
  isFindRegistry,
  writeFile,
  registryTests
}

