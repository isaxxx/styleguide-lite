const styleguideLite = require('../index');
const test = require('ava');
const fs = require('fs-extra');

test('parse - case 001', (t) => {
  return styleguideLite({
    src: './test/expect/case-001/style.css',
    dest: './dest/assets/styleguide/',
    template: './test/expect/case-001/index.ejs'
  }).then(() => {
    t.is(fs.readFileSync('./test/fixtures/case-001/index.html', 'UTF-8'), fs.readFileSync('./dest/assets/styleguide/index.html', 'UTF-8'));
  });
});
