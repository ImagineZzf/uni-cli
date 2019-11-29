const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const download = require('download-git-repo')
const spinner = ora('uni-cli')

// 获取项目名称
const getProjectName = dir => {
  const newDir = dir ? dir : process.cwd()
  return path.parse(newDir).base
}

// 拼接路径到项目目录
const resolveDir = dir => path.resolve(process.cwd(), dir)

// 拼接路径到当前目录
const resolveSrc = dir => path.resolve(__dirname, dir)

// 提示用户输入内容
const input = questions => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 打印loading
const logStart = msg => {
  spinner.start(msg)
}

// 打印成功log
const log = msg => {
  spinner.succeed(chalk.green(msg))
}

// 打印失败log
const logError = msg => {
  spinner.fail(chalk.red(msg))
}

// 打印失败log，并退出
const logExit = msg => {
  logError(msg)
  process.exit()
}

// 创建文件夹
const makeDir = dir => {
  const fileName = getProjectName(dir)
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      log(`${fileName}创建成功`)
      resolve(fileName)
    } else {
      logError(`${fileName}已经存在`)
      reject()
    }
  })
}

// 下载项目模版
const downloadTemplate = dir => {
  if (!dir) {
    return
  }
  logStart('开始下载模版，请稍等...')
  return new Promise((resolve, reject) => {
    download('ImagineZzf/uni-template', dir, function(err) {
      if (err) {
        // 下载失败
        logError('模版下载失败')
        reject()
      } else {
        log('模版下载成功')
        resolve()
      }
    })
  })
}

module.exports = {
  getProjectName,
  resolveDir,
  resolveSrc,
  input,
  logStart,
  log,
  logError,
  logExit,
  makeDir,
  downloadTemplate
}
