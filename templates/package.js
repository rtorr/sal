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
      'express': '^4.13.4',
      'immutable': '^3.7.6',
      'nconf': '^0.8.4',
      'pm2': '^1.0.0',
      'react': '^0.14.7',
      'react-dom': '^0.14.7',
      'react-router': '^2.0.0',
      'sal': '^1.1.0',
      'welp': '^5.2.0',
      'winston': '^2.1.1'
    },
    'devDependencies': {
      'eslint': '^2.0.0-rc.0',
      'eslint-plugin-promise': '^1.0.8',
      'eslint-plugin-standard': '^1.3.2',
      'eslint-config-standard': '^5.1.0',
      'expect': '^1.14.0',
      'karma': '^0.13.8',
      'karma-browserstack-launcher': '^0.1.4',
      'karma-coverage': '^0.5.3',
      'karma-mocha': '^0.2.0',
      'karma-mocha-reporter': '^1.1.1',
      'karma-phantomjs-launcher': '^0.2.1',
      'karma-sinon': '^1.0.4',
      'karma-sourcemap-loader': '^0.3.5',
      'karma-webpack': '^1.7.0',
      'mocha': '^2.4.5',
      'node-sass': '^3.3.2',
      'phantomjs-prebuilt': '^2.1.4',
      'pre-commit': '^1.1.2',
      'sinon': '^1.17.3',
      'typescript': '^1.9.0-dev.20160210',
      'webpack': '^1.12.13'
    },
    'scripts': {
      'start': 'sal -r .',
      'test': 'NODE_ENV=test karma start ./config/karma.conf.js --single-run && mocha --timeout 10000'
    },
    'author': 'rtorr <rtorruellas@gmail.com> (http://rtorr.com/)',
    'license': 'ISC'
  }
}
