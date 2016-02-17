module.exports = function (name) {
  return {
    'apps': [{
      'name': `${name}`,
      'script': './dist/server/index.js',
      'node_args': '-optimize_for_size --max_old_space_size=460 --gc_interval=100',
      'watch': false,
      'exec_mode': 'fork',
      'instances': 0,
      'env': {
        'NODE_ENV': 'production'
      }
    }]
  }
}
