module.exports = function (name) {
  return {
    'name': `${name}`,
    'env': {},
    'image': 'gliderlabs/herokuish',
    'buildpacks': [
      {
        'url': 'https://github.com/heroku/heroku-buildpack-nodejs'
      }
    ]
  }
}
