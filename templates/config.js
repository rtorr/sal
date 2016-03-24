var webpack = require('webpack')
module.exports = {
  // If  you are using Dokku, these settings will not be used.
  // Please reffer to app.json, and know that dokku will be
  // using port 5000
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
