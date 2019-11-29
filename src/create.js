const Utils = require('../utils/index')
const Prompt = require('../utils/prompt')

let promptList = []

// 创建项目
const createProject = () => {
  promptList = [{ ...Prompt.projectName }]
  Utils.input(promptList).then(res => {
    // 得到输入的项目名
    // 创建项目目录
    makeProjectDir(res.projectName)
  })
}

// 创建项目目录
const makeProjectDir = dir => {
  const newDir = Utils.resolveDir(dir)
  Utils.makeDir(newDir)
    .then(res => {
      // 创建成功后，进入项目目录，下载模版
      downloadTemplate(newDir)
    })
    .catch(err => {
      // 如果该项目已存在，则重新输入
      createProject()
    })
}

// 下载模版
const downloadTemplate = dir => {
  Utils.downloadTemplate(dir)
    .then(res => {
      // 下载成功
    })
    .catch(err => {
      // 下载失败
    })
}

module.exports = args => {
  // 如果没有传递参数（项目名称）
  if (!args.length) {
    // 提示输入项目名称
    createProject()
  } else {
    makeProjectDir(args[0])
  }
}
