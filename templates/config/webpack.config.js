var webpack = require('webpack')
var path = require('app-root-path')
var config = require('./../config')

var plugins = process.env.NODE_ENV === 'production' ? config.webpack.production.plugins : config.webpack.dev.plugins
var loaders = process.env.NODE_ENV === 'production' ? config.webpack.production.loaders : config.webpack.dev.loaders

plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
)

var webpack_options = {
  devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : '',
  entry: `${__dirname}/../dist/ts-dist/src/public/js/index.js`,
  plugins: plugins,
  module: {
    loaders: loaders
  },
  output: {
    path: './src/public/dist/js',
    filename: 'bundle.js',
    publicPath: `${path}/src/public`
  }
}

module.exports = webpack_options
