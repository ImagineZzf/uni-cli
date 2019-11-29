const Utils = require('../utils/index')

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
  // 下载模版
  downloadTemplate(Utils.getProjectName())
}
