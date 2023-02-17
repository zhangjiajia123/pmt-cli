import chalk from 'chalk'
import { readFile, getCurrentRegistry, isFindRegistry, writeFile, registryTests } from './untils.js';
import { NPMRC, REGISTRIES, REPOSITORY, REGISTRY, HOME } from './constants.js';
// 获取列表
const onList = async () => {
  // 获取当前源
  const current = await getCurrentRegistry()
  REGISTRIES.forEach((item) => {
    const str = `${(item.name + " ").padEnd(14, " ")} ${item.home.padEnd(
      35,
      " "
    )} ${item.registry}`;
    console.log(
      item.registry === current ? chalk.green(`🚀 ${str}`) : `   ${str}`
    );
  });
}

// 获取当前使用的包管理工具以及源
const onCurrent = async () => {
  const current = await getCurrentRegistry()
  const item =  REGISTRIES.filter(list => list.registry === current)[0]
  const str = `${(item.name + " ").padEnd(14, " ")} ${item.home.padEnd(35, " ")} ${item.registry}`;
  console.log(
    chalk.green(`🚀 ${str}`)
  )
}

// 切换源
const onUse = async (name) => {
  // 判断切换的源是否在预设的源组里
  if(!await isFindRegistry(name)) {
    return
  }
  let registry = {}
  REGISTRIES.some(list => {
    if(list.name === name) {
      registry.registry = list.registry
    }
  })
  const npmrc = await readFile(NPMRC);
  await writeFile(NPMRC, Object.assign(npmrc, registry));
}

// 测速
const onTest = async (name) => {
  if(name && !isFindRegistry(name)){
    return
  }
  const nameSource = REGISTRIES.filter(list => list.name === name)
  const sources = name ? [...nameSource] : [...REGISTRIES]
  const current = await getCurrentRegistry()
  const results = await registryTests(sources)
  results.forEach((item) => {
    const str = `${(item.name + " ").padEnd(10, " ")} ${item.registry.padEnd(35, " ")} ${item.time}ms`;
    console.log(
      item.registry === current ? chalk.green(`🚀 ${str}`) : `   ${str}`
    );
  });
  
}
export {
  onList,
  onCurrent,
  onUse,
  onTest
}
