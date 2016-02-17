
module.exports = function (name) {
  return {
    'apps': [{
      'name': `${name}`,
      'script': './dist/ts-dist/server/index.js',
      'node_args': '-optimize_for_size --max_old_space_size=460 --gc_interval=100',
      'watch': true,
      'ignore_watch': [
        'node_modules',
        'src',
        'config',
        'mock_data',
        'test',
        'typings'
      ],
      'exec_mode': 'fork',
      'env': {
        'NODE_ENV': 'dev'
      }
    }]
  }
}
