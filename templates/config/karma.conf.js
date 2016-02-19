var path = require('path')
var webpack = require('webpack')
var webpack_conf = require('./webpack.config')

webpack_conf.devtool = 'inline-source-map'
webpack_conf.module.loaders.push(
  {
    test: /\.js$/,
    include: path.resolve('dist/ts-dist'),
    exclude: /__tests__/,
    loader: 'isparta'
  }
)

webpack_conf.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('test')
  })
)

webpack_conf.webpackServer = {
  noInfo: true
}

module.exports = function (config) {
  config.set({

    browsers: [ 'PhantomJS' ],
    frameworks: [ 'mocha', 'sinon' ],
    reporters: [ 'mocha', 'coverage' ],

    files: [
      './../node_modules/es5-shim/es5-shim.js',
      './../node_modules/es5-shim/es5-sham.js',
      './tests.webpack.js'
    ],

    preprocessors: {
      './tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: webpack_conf,

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {

      reporters: [
        { type: 'html', subdir: 'lcov-report', dir: './../coverage/frontend' },
        { type: 'lcovonly', subdir: '.', dir: './../coverage/frontend' }
      ]
    }

  })
}
