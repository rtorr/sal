var fs = require('fs-extra')
var mkdirp = require('mkdirp')

var pm2_dev = require('./../templates/config/pm2_dev')
var pm2_prod = require('./../templates/config/pm2_prod')
var package_json = require('./../templates/package')

const THIER_DIRECTORY = process.cwd()
const DIRECTORIES = [
  '.vscode',
  'config',
  'mock_data',
  'src/components',
  'src/public/images',
  'src/public/scss',
  'src/public/js',
  'server/views',
  'server/routes',
  'test',
  'typings'
]
const FILES_TO_COPY = [
  '.vscode',
  'config/Procfile_dev',
  'config/webpack.config.js',
  'src',
  'test',
  'typings',
  '.editorconfig',
  '.gitignore',
  'circle.yml',
  'jsconfig.json',
  'local.json',
  'Makefile',
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

  const pm2_dev_conf = `${THIER_DIRECTORY}/${path}/config/pm2_dev.json`
  const pm2_prod_conf = `${THIER_DIRECTORY}/${path}/config/pm2_prod.json`
  const package_json_conf = `${THIER_DIRECTORY}/${path}/package.json`

  fs.writeFile(pm2_dev_conf, JSON.stringify(pm2_dev(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', pm2_dev_conf)
  })

  fs.writeFile(pm2_prod_conf, JSON.stringify(pm2_prod(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', pm2_prod_conf)
  })

  fs.writeFile(package_json_conf, JSON.stringify(package_json(project_name), null, '\t'), (err) => {
    if (err) throw err
    console.log('wrote:', package_json_conf)
  })

  // fs.writeFile(`${THIER_DIRECTORY}/${path}/README.md`, pm2_prod(project_name), (err) => {
  //   if (err) throw err
  //   console.log('wrote:', `${THIER_DIRECTORY}/${path}/pm2_dev.json`)
  // })
}

module.exports = {
  createProjectRoot,
  createProjectSubDirectories,
  createProjectFiles
}
