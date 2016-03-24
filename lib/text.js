var colors = require('colors/safe')

function goodText (label, text) {
  return `${colors.green(label)} ${text}`
}

function badText (label, text) {
  return `${colors.red(label)} ${text}`
}

module.exports = {
  badText: badText,
  goodText: goodText
}
