#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version')
  .option('c, create', '')
  .option('i, init', '')
  .parse(process.argv)

const options = ['create', 'init']

options.forEach(key => {
  if (program[key]) {
    require(`../src/${key}`)(program.args)
  }
})
