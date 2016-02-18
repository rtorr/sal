#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var argv = require('yargs')
  .alias('r', 'run')
  .alias('d', 'dev')
  .alias('p', 'prod')
  .alias('n', 'new')
  .alias('k', 'kill')
  .alias('t', 'test')
  .argv

var newProject = require('./../lib/new')
var runProject = require('./../lib/run')

const THIER_DIRECTORY = process.cwd()
const BIN = `${__dirname}/../node_modules/.bin`
const ENV_DEVELOP = argv.dev
const ENV_PRODUCTION = argv.prod
const TEST = argv.test
const RUN = argv.run
const NEW_PROJECT = argv.new
const KILL = argv.kill

var project_path
var project_name

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

if (TEST) {
  process.env.NODE_ENV = 'test'
}

if (!ENV_DEVELOP && !ENV_PRODUCTION && !TEST) {
  process.env.NODE_ENV = 'dev'
}

console.log('enviroment:', process.env.NODE_ENV)

// Run

if (RUN) {
  console.log('running project at:', RUN)
  project_path = RUN.length ? path.normalize(RUN) : '.'
  project_name = JSON.parse(fs.readFileSync(`${project_path}/package.json`)).name
  if (process.env.NODE_ENV === 'dev') {
    runProject.runDevelop(BIN, THIER_DIRECTORY, project_path, project_name)
  }
  if (process.env.NODE_ENV === 'production') {
    runProject.runProduction(BIN, THIER_DIRECTORY, project_path, project_name)
  }
}

if (TEST) {
  project_path = TEST.length ? path.normalize(TEST) : '.'
  runProject.test(BIN, THIER_DIRECTORY, project_path)
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
