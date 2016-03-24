var spawn = require('child_process').spawn
var execSync = require('child_process').execSync
var colors = require('colors/safe')
var pm2 = require('pm2')

function goodText (label, text) {
  return `${colors.green(label)} ${text}`
}

function badText (label, text) {
  return `${colors.red(label)} ${text}`
}

function build (BIN, THIER_DIRECTORY, project_path) {
  var prod = process.env.NODE_ENV === 'production'
  execSync(`${BIN}/tsc --project ${THIER_DIRECTORY}/${project_path}/jsconfig.json`)
  execSync(`${BIN}/webpack --config ${THIER_DIRECTORY}/${project_path}/config/webpack.config.js ${prod ? '-p' : ''}`)
  execSync(`${BIN}/node-sass ${THIER_DIRECTORY}/${project_path}/src/public/scss -o ${THIER_DIRECTORY}/${project_path}/src/public/dist/css ${prod ? '--output-style compressed' : ''}`)
  console.log(goodText('build:', 'Assets built'))
}

function buildAndWatch (BIN, THEIR_DIRECTORY, project_path) {
  build(BIN, THEIR_DIRECTORY, project_path)
  var tsc = spawn(`${BIN}/tsc`, ['--project', `${THEIR_DIRECTORY}/${project_path}/jsconfig.json`, '--watch'])
  tsc.stdout.on('data', function (data) {
    console.log(goodText('tsc:', data))
  })
  tsc.stderr.on('data', function (data) {
    console.log(badText('tsc error:', data))
  })
  tsc.on('exit', function (code) {
    console.log('tsc with code ' + code)
  })

  var webpack = spawn(`${BIN}/webpack`, ['--config', `${THEIR_DIRECTORY}/${project_path}/config/webpack.config.js`, '--watch'])
  webpack.stdout.on('data', function (data) {
    console.log(goodText('webpack:', data))
  })
  webpack.stderr.on('data', function (data) {
    console.log(badText('webpack error:', data))
  })
  webpack.on('exit', function (code) {
    console.log('webpack with code ' + code)
  })

  var sass = spawn(`${BIN}/node-sass`, ['-w', `${THEIR_DIRECTORY}/${project_path}/src/public/scss`, '-o', `${THEIR_DIRECTORY}/${project_path}/src/public/dist/css`])
  sass.stdout.on('data', function (data) {
    console.log(goodText('node-sass:', data))
  })
  sass.stderr.on('data', function (data) {
    console.log(badText('node-sass error:', data))
  })
  sass.on('exit', function (code) {
    console.log('node-sass exited with code ' + code)
  })
}


function runDevelop (BIN, THEIR_DIRECTORY, project_path, projectName) {
  buildAndWatch(BIN, THEIR_DIRECTORY, project_path)
  pm2.connect(function (err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      name: `${projectName}`,
      cwd: `${THEIR_DIRECTORY}/${project_path}`,
      script: 'dist/ts-dist/src/server/index.js',
      exec_mode: 'fork',
      watch: true,
      node_args: '-optimize_for_size --max_old_space_size=460 --gc_interval=100',
      ignore_watch: [
        'node_modules',
        'src',
        'config',
        'mock_data',
        'test',
        'typings'
      ],
      env: {
        'NODE_ENV': 'dev'
      }
    }, function (err, apps) {
      if (err) {
        console.log(badText('pm2 error:', err))
      }
      pm2.disconnect()
      var server_logs = spawn(`${BIN}/pm2`, ['logs', `${projectName}`])
      server_logs.stdout.on('data', function (data) {
        console.log(goodText('server_logs:', data))
      })
      server_logs.stderr.on('data', function (data) {
        console.log(badText('server_logs error:', data))
      })
      server_logs.on('exit', function (code) {
        console.log('server_logs exited with code ' + code)
      })
    })
  })
}

function runProduction (BIN, THEIR_DIRECTORY, project_path, projectName) {
  build(BIN, THEIR_DIRECTORY, project_path)
  pm2.connect(function (err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      name: `${projectName}`,
      cwd: `${THEIR_DIRECTORY}/${project_path}`,
      script: 'dist/ts-dist/src/server/index.js',
      exec_mode: 'fork',
      watch: false,
      node_args: '-optimize_for_size --max_old_space_size=460 --gc_interval=100',
      env: {
        'NODE_ENV': 'production'
      }
    }, function (err, apps) {
      if (err) {
        console.log(badText('pm2 error:', err))
      }
      pm2.disconnect()
      var server_logs = spawn(`${BIN}/pm2`, ['logs', `${projectName}`])
      server_logs.stdout.on('data', function (data) {
        console.log(goodText('server_logs:', data))
      })
      server_logs.stderr.on('data', function (data) {
        console.log(badText('server_logs error:', data))
      })
      server_logs.on('exit', function (code) {
        console.log('server_logs exited with code ' + code)
      })
    })
  })
}

function kill () {
  pm2.connect(function (err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.killDaemon(function (e, ret) {
      if (e) {
        console.log(e)
      } else {
        console.log(goodText('kill:', 'all servers shut down'))
      }
      process.exit(2)
    })
  })
}

function test (BIN, THEIR_DIRECTORY, project_path) {
  build(BIN, THEIR_DIRECTORY, project_path)
  var karma = spawn(`${BIN}/karma`, ['start', `${THEIR_DIRECTORY}/${project_path}/config/karma.conf.js`, '--single-run'])
  karma.stdout.on('data', function (data) {
    console.log(goodText('karma:', data))
  })
  karma.stderr.on('data', function (data) {
    console.log(badText('karma error:', data))
  })
  karma.on('exit', function (code) {
    console.log('karma with code ' + code)
  })
  var mocha = spawn(`${BIN}/mocha`, [`${THEIR_DIRECTORY}/${project_path}/test`])
  mocha.stdout.on('data', function (data) {
    console.log(goodText('mocha:', data))
  })
  mocha.stderr.on('data', function (data) {
    console.log(badText('mocha error:', data))
  })
  mocha.on('exit', function (code) {
    console.log('mocha with code ' + code)
  })
}

module.exports = {
  build,
  buildAndWatch,
  runDevelop,
  runProduction,
  kill,
  test
}
