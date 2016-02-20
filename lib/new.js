var fs = require('fs-extra')
var mkdirp = require('mkdirp')

var package_json = require('./../templates/package')

const THIER_DIRECTORY = process.cwd()
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
  'circle.yml',
  'jsconfig.json',
  'config.js',
  'README.md',
  'tsconfig.json',
  'tsd.json'
]

function createProjectRoot (path, callback) {
  mkdirp(`${THIER_DIRECTORY}/${path}`, (err) => {
    if (err) console.error(err)
    console.log('created directory at:', path)
    callback(path)
  })
}

function createProjectSubDirectories (path, callback) {
  DIRECTORIES.map((dir) => {
    mkdirp(`${THIER_DIRECTORY}/${path}/${dir}`, (err) => {
      if (err) console.error(err)
      console.log('created directory at:', `${THIER_DIRECTORY}/${path}/${dir}`)
    })
  })
  return callback(path)
}

function createProjectFiles (path, project_name, callback) {
  FILES_TO_COPY.map((file) => {
    fs.copy(`${__dirname}/../templates/${file}`, `${THIER_DIRECTORY}/${path}/${file}`, function (err) {
      if (err) return console.error(err)
      console.log('wrote:', `${THIER_DIRECTORY}/${path}/${file}`)
    })
  })

  fs.copy(`${__dirname}/../templates/eslintrc`, `${THIER_DIRECTORY}/${path}/.eslintrc`, function (err) {
    if (err) return console.error(err)
    console.log('wrote:', `${THIER_DIRECTORY}/${path}/.eslint`)
  })

  const package_json_conf = `${THIER_DIRECTORY}/${path}/package.json`
  fs.writeFile(package_json_conf, JSON.stringify(package_json(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', package_json_conf)
  })
}

module.exports = {
  createProjectRoot,
  createProjectSubDirectories,
  createProjectFiles
}
