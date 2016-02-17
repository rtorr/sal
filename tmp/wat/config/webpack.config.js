var path = require('app-root-path')
module.exports = {
  entry: './dist/ts-dist/public/js/index.js',
  output: {
    path: './src/public/dist/js',
    filename: 'bundle.js',
    publicPath: `${path}/src/public`
  }
}
