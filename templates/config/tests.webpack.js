var context = require.context('./../dist/ts-dist', true, /-test\.js$/)
context.keys().forEach(context)
