const test = require('ava');
const fs = require('fs-extra');
const styleguideLite = require('../index');

test('parse - case 001', (t) => {
  return styleguideLite({
    src: './test/fixtures/case-001/style.css',
    dest: './dest/assets/styleguide/',
    template: './test/fixtures/case-001/index.ejs'
  }).then(() => {
    t.is(fs.readFileSync('./test/expect/case-001/index.html', 'UTF-8'), fs.readFileSync('./dest/assets/styleguide/index.html', 'UTF-8'));
  });
});
