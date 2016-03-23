#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var colors = require('colors/safe')
var packageJson = require('./../package.json')

var argv = require('yargs')
  .option('run', {
    alias: 'r',
    describe: 'Run a sal application - `sal --run <path>`'
  })
  .option('test', {
    alias: 't',
    describe: 'Run your tests'
  })
  .option('build', {
    alias: 'build',
    describe: 'build project assets'
  })
  .option('new', {
    alias: 'n',
    describe: 'Create a new Sal project - `sal --new <path>`'
  })
  .option('dev', {
    alias: 'd',
    describe: 'Set process.env.NODE_ENV to dev'
  })
  .option('prod', {
    alias: 'p',
    describe: 'Set process.env.NODE_ENV to production'
  })
  .option('kill', {
    alias: 'k',
    describe: 'Kill all Sal servers (This maps to pm2)'
  })
  .option('version', {
    alias: 'v',
    describe: 'print sal version'
  })
  .nargs('new', 1)
  .help('help')
  .wrap(70)
  .argv

var newProject = require('./../lib/new')
var runProject = require('./../lib/run')

const THEIR_DIRECTORY = process.cwd()
const BIN = `${THEIR_DIRECTORY}/node_modules/.bin`
const ENV_DEVELOP = argv.dev
const ENV_PRODUCTION = argv.prod
const TEST = argv.test
const RUN = argv.run
const BUILD = argv.build
const NEW_PROJECT = argv.new
const KILL = argv.kill
const VERSION = argv.version

var project_path
var project_name

function projectName (param) {
  const path_array = path.normalize(param).split('/')
  return path_array[path_array.length - 1]
}

if (!VERSION) {
  console.log(colors.blue(`
---------------------- Sal v${packageJson.version} ----------------------
          use "sal --help" to see all options
              https://github.com/rtorr/sal
---------------------------------------------------------
`))
}
// Environment

if (ENV_DEVELOP) {
  process.env.NODE_ENV = 'dev'
}

if (ENV_PRODUCTION) {
  process.env.NODE_ENV = 'production'
}

if (TEST) {
  process.env.NODE_ENV = 'test'
}

if (!ENV_DEVELOP && !ENV_PRODUCTION && !TEST) {
  process.env.NODE_ENV = 'dev'
}

// Run

if (RUN) {
  console.log('enviroment:', process.env.NODE_ENV)
  project_path = RUN.length ? path.normalize(RUN) : '.'
  project_name = JSON.parse(fs.readFileSync(`${project_path}/package.json`)).name
  if (process.env.NODE_ENV === 'dev') {
    runProject.runDevelop(BIN, THEIR_DIRECTORY, project_path, project_name)
  }
  if (process.env.NODE_ENV === 'production') {
    runProject.runProduction(BIN, THEIR_DIRECTORY, project_path, project_name)
  }
}

// build

if (RUN) {
  console.log('enviroment:', process.env.NODE_ENV)
  project_path = RUN.length ? path.normalize(RUN) : '.'
  runProject.build(BIN, THEIR_DIRECTORY, project_path)
}

if (TEST) {
  console.log('enviroment:', process.env.NODE_ENV)
  project_path = TEST.length ? path.normalize(TEST) : '.'
  runProject.test(BIN, THEIR_DIRECTORY, project_path)
}

// New Project

if (NEW_PROJECT) {
  console.log('creating new project at:', NEW_PROJECT)
  console.log('project name:', projectName(NEW_PROJECT))
  newProject.createProjectRoot(NEW_PROJECT, (path) => {
    newProject.createProjectSubDirectories(path, (path) => {
      newProject.createProjectFiles(path, projectName(NEW_PROJECT))
    })
  })
  console.log('run:', 'cd into', `${NEW_PROJECT}`, '&& npm install')
  console.log('run:', 'sal r .')
}

if (KILL) {
  runProject.kill()
}

if (VERSION) {
  console.log(`v${packageJson.version}`)
}
