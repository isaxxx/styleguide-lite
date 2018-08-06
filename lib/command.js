/**
 *
 * Command
 * @return {object}
 *
 */

const path = require('path');

module.exports = require('yargs').usage('styleguide-lite [options]').option('src', {
  default: './src/scss/**/*.scss',
  type: 'string',
  describe: 'src files path pattern.'
}).option('dest', {
  default: './dest/assets/styleguide/',
  type: 'string',
  describe: 'dest directory path.'
}).option('template', {
  default: path.resolve(__dirname, '../template/index.ejs'),
  type: 'string',
  describe: 'template file path.'
}).version().help('help').alias('version', 'v').alias('help', 'h').argv;
