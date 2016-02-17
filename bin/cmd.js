#!/usr/bin/env node

var path = require('path')
var argv = require('yargs')
  .alias('r', 'run')
  .alias('d', 'dev')
  .alias('p', 'prod')
  .alias('n', 'new')
  .alias('k', 'kill')
  .argv

var newProject = require('./../lib/new')
var runProject = require('./../lib/run')

const THIER_DIRECTORY = process.cwd()
const BIN = `${__dirname}/../node_modules/.bin`
const ENV_DEVELOP = argv.dev
const ENV_PRODUCTION = argv.prod
const RUN = argv.run
const NEW_PROJECT = argv.new
const KILL = argv.kill

function projectName (param) {
  const path_array = path.normalize(param).split('/')
  return path_array[path_array.length - 1]
}

// Environment

if (ENV_DEVELOP) {
  process.env.NODE_ENV = 'dev'
}

if (ENV_PRODUCTION) {
  process.env.NODE_ENV = 'production'
}

if (!ENV_DEVELOP && !ENV_PRODUCTION) {
  process.env.NODE_ENV = 'dev'
}

console.log('enviroment:', process.env.NODE_ENV)

// Run

if (RUN) {
  console.log('running project at:', RUN)
  var project_path = RUN.length ? path.normalize(RUN) : '.'
  if (process.env.NODE_ENV === 'dev') {
    runProject.runDevelop(BIN, THIER_DIRECTORY, project_path, projectName(RUN))
  }
  if (process.env.NODE_ENV === 'production') {
    runProject.runProduction(BIN, THIER_DIRECTORY, project_path, projectName(RUN))
  }
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
