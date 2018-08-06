/**
 *
 * Exec
 * @param {object} param
 * @return {promise}
 *
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const Remarkable = require('remarkable');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const defaultParam = require('./command');
const output = require('./util/output');

const markdown = new Remarkable({
  html: true
});

module.exports = (param) => {
  return new Promise((resolve) => {
    updateNotifier({pkg}).notify();
    param = Object.assign(defaultParam, param);
    resolve();
  }).then(() => {
    const processing = [];
    let srcFilesPath = [];
    let data = [];
    if (Array.isArray(param.src)) {
      param.src.forEach((srcFilesPathPattern) => {
        srcFilesPath = srcFilesPath.concat(glob.sync(srcFilesPathPattern));
      });
    } else {
      srcFilesPath = srcFilesPath.concat(glob.sync(param.src));
    }
    srcFilesPath.forEach((srcFilePath) => {
      processing.push(new Promise((resolve, reject) => {
        fs.readFile(srcFilePath, 'utf8', (err, string) => {
          if (err) {
            reject(err);
          } else {
            const text = string.match(/\/\*\s={3,}\s[.\d]+\s.+\s={3,}\s([^*]|\*[^/])*\*\//g);
            if (text) {
              for (let i = 0; i < text.length; i++) {
                const block = text[i].match(/^\/\*\s={3,}\s([.\d]+)\s(.+)\s={3,}\s([\s\S]*)\s\*\/$/);
                const numbers = block[1].split('.');
                const title = block[2];
                const content = markdown.render(block[3]);
                const sectionNumber = parseInt(numbers[0]);
                const subSectionNumber = parseInt(numbers[1]);
                data.push({
                  sectionNumber: sectionNumber,
                  subSectionNumber: subSectionNumber,
                  title: title,
                  content: content,
                  link: sectionNumber === 0 ? 'index.html' : 'section-' + sectionNumber + '.html',
                  isOverview: subSectionNumber === 0 ? true : false
                });
              }
            }
            resolve(data);
          }
        });
      }));
    });
    return Promise.all(processing);
  }).then((data) => {
    data = data[data.length - 1];
    return output(param, data);
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
