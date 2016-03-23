module.exports = function (name) {
  return {
    'name': `${name}`,
    'version': '1.0.0',
    'description': '',
    'main': 'index.js',
    'directories': {
      'test': 'test'
    },
    'dependencies': {
      'app-root-path': '^1.0.0',
      'ejs': '^2.4.1',
      'es5-shim': '^4.5.4',
      'express': '^4.13.4',
      'immutable': '^3.7.6',
      'node-sass': '^3.3.2',
      'pm2': '^1.0.0',
      'react': '^0.14.7',
      'react-dom': '^0.14.7',
      'react-router': '^2.0.0',
      'sal': '^1.1.13',
      'typescript': '^1.9.0-dev.20160210',
      'webpack': '^1.12.13',
      'welp': '^5.2.0',
      'winston': '^2.1.1'
    },
    'devDependencies': {
      'eslint': '^2.0.0-rc.0',
      'eslint-config-standard': '^5.1.0',
      'eslint-plugin-promise': '^1.0.8',
      'eslint-plugin-standard': '^1.3.2',
      'expect': '^1.14.0',
      'karma': '^0.13.8',
      'karma-browserstack-launcher': '^0.1.4',
      'karma-coverage': '^0.5.3',
      'karma-mocha': '^0.2.0',
      'karma-mocha-reporter': '^1.1.1',
      'karma-phantomjs-launcher': '^1.0.0',
      'karma-sourcemap-loader': '^0.3.5',
      'karma-webpack': '^1.7.0',
      'mocha': '^2.4.5',
      'phantomjs-prebuilt': '^2.1.6',
      'pre-commit': '^1.1.2'
    },
    'scripts': {
      'start': 'sal -pr',
      'test': 'NODE_ENV=test karma start ./config/karma.conf.js --single-run && mocha --timeout 10000'
    },
    'author': 'YOUR NAME HERE)',
    'license': 'MIT'
  }
}
