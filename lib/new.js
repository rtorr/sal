var fs = require('fs-extra')
var mkdirp = require('mkdirp')

var package_json = require('./../templates/package')
var app_json = require('./../templates/app')

const THEIR_DIRECTORY = process.cwd()
const DIRECTORIES = [
  '.vscode',
  'config',
  'src/components',
  'src/public/images',
  'src/public/scss',
  'src/public/js',
  'test',
  'typings'
]
const FILES_TO_COPY = [
  '.vscode',
  'config/karma.conf.js',
  'config/tests.webpack.js',
  'config/webpack.config.js',
  'src',
  'test',
  'typings',
  '.editorconfig',
  '.gitignore',
  'jsconfig.json',
  'config.js',
  'README.md',
  'tsconfig.json',
  'tsd.json',
  'Procfile'
]

function createProjectRoot (path, callback) {
  mkdirp(`${THEIR_DIRECTORY}/${path}`, (err) => {
    if (err) console.error(err)
    console.log('created directory at:', path)
    callback(path)
  })
}

function createProjectSubDirectories (path, callback) {
  DIRECTORIES.map((dir) => {
    mkdirp(`${THEIR_DIRECTORY}/${path}/${dir}`, (err) => {
      if (err) console.error(err)
      console.log('created directory at:', `${THEIR_DIRECTORY}/${path}/${dir}`)
    })
  })
  return callback(path)
}

function createProjectFiles (path, project_name, callback) {
  FILES_TO_COPY.map((file) => {
    fs.copy(`${__dirname}/../templates/${file}`, `${THEIR_DIRECTORY}/${path}/${file}`, function (err) {
      if (err) return console.error(err)
      console.log('wrote:', `${THEIR_DIRECTORY}/${path}/${file}`)
    })
  })

  fs.copy(`${__dirname}/../templates/eslintrc`, `${THEIR_DIRECTORY}/${path}/.eslintrc`, function (err) {
    if (err) return console.error(err)
    console.log('wrote:', `${THEIR_DIRECTORY}/${path}/.eslint`)
  })

  const package_json_conf = `${THEIR_DIRECTORY}/${path}/package.json`
  fs.writeFile(package_json_conf, JSON.stringify(package_json(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', package_json_conf)
  })

  const app_json_conf = `${THEIR_DIRECTORY}/${path}/app.json`
  fs.writeFile(app_json_conf, JSON.stringify(app_json(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', app_json_conf)
  })
}

module.exports = {
  createProjectRoot,
  createProjectSubDirectories,
  createProjectFiles
}
