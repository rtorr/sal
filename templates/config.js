var webpack = require('webpack')
module.exports = {
  server: {
    port: '3000',
    secret: 'change',
    apiKey: 'change'
  },
  webpack: {
    production: {
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            unsafe: true,
            warnings: false
          },
          output: { comments: false }
        })
      ],
      loaders: []
    },
    dev: {
      plugins: [
        new webpack.NoErrorsPlugin()
      ],
      loaders: []
    }
  }
}
