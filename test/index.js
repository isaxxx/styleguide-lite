const styleguideLite = require('../index');
const test = require('ava');

// test

test('parse test', (t) => {
	return new Promise((resolve, reject) => {
		return styleguideLite({
		  src: './test/css/**/*.css',
		  isOutput: false
		}, (param, data) => {
			if ( data[0].title === 'Overview' ) {
				return resolve(t.pass());
			} else {
				return reject(t.fail());
			}
		});
	});
});
