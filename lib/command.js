/**
 *
 * command line
 * @return {object} config object
 *
 */

module.exports = require('yargs').usage('styleguide-lite [options]')
.option('src', {
    default: './src/scss/**/*.scss',
    alias: 's',
    type: 'string',
    describe: 'src files path pattern.'
})
.option('dest', {
    default: './dest/styleguide',
    alias: 'd',
    type: 'string',
    describe: 'dest directory path.'
})
.option('template', {
	default: __dirname + '/../template/index.ejs',
    alias: 't',
    type: 'string',
    describe: 'template file path.',
})
.option('assets', {
    default: './dest/assets',
    alias: 'a',
    type: 'string',
    describe: 'assets directory path.',
})
.option('isOutput', {
    default: true,
    type: 'bool',
    describe: 'Whether to output.',
})
.version()
.help('help')
.alias('version', 'v')
.alias('help', 'h')
.argv;
