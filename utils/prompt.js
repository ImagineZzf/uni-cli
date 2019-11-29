const projectName = {
  type: 'input',
  message: '请输入项目名称:',
  name: 'projectName',
  validate: val => {
    const nameReg = /^\w[\w]+/
    if (nameReg.test(val)) {
      // 校验位数
      return true
    }
    return '项目名称只能包含字母、数字、以及下划线'
  }
}

module.exports = {
  projectName
}
