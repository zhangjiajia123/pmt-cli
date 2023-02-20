const fs = require('fs');
const ini = require('ini');
const { NPMRC, REGISTRY, REGISTRIES } = require('./constants')
const fetch = require('node-fetch')

function exit(err) {
  console.error("error: " + err);
  process.exit(1);
}
// 获取.npmrc中的镜像源
async function readFile(file) {
  return new Promise((resolve) => {
    // 判断路径是否有效
    if (!fs.existsSync(file)) {
      resolve({});
    } else {
      try {
        const content = ini.parse(fs.readFileSync(file, 'utf-8'));
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
      fs.writeFileSync(path, ini.stringify(content));
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

exports.default = {
  readFile,
  getCurrentRegistry,
  isFindRegistry,
  writeFile,
  registryTests
}

