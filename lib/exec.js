const fs = require('fs-extra');
const chalk = require('chalk');
const glob = require('glob');
const Remarkable = require('remarkable');
const markdown = new Remarkable();
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const defaultParam = require('./command');
const output = require('./output');
const deleteLastSlash = require('./util/deleteLastSlash');

/**
 *
 * exec
 * @param {object} param        param object
 * @param {function} callback   callback
 *
 */

module.exports = (param, callback) => {
    param = Object.assign({}, defaultParam, param);
    callback = callback || function () {};
    param.dest = deleteLastSlash(param.dest);
    param.template = deleteLastSlash(param.template);
    return new Promise((resolve, reject) => {
        updateNotifier({pkg}).notify();
        resolve();
    })
    .then(() => {

        const srcFilesPath = glob.sync(param.src);
        const srcFilesLength = srcFilesPath.length;

        const patternStyleguide = /\/\*\s={3,}\s[\.\d]+\s.+\s={3,}\s([^*]|\*[^/])*\*\//g;
        const patternStyleguideDetail = /^\/\*\s={3,}\s([\.\d]+)\s(.+)\s={3,}\s([\s\S]*)\s\*\/$/;
        
        let srcFilesCompleteCount = 0;
        let data = [];

        srcFilesPath.map((srcFilePath) => {
            try {
                getStyleguideData(srcFilePath);
            } catch (err) {
                console.error(chalk.red(err));
            }
        });

        function getStyleguideData(srcFilePath) {
            fs.readFile(srcFilePath, 'utf8', function (err, string) {
                srcFilesCompleteCount++;
                if (err) {
                    console.error(chalk.red(err));
                } else {
                    let result = string.match(patternStyleguide),
                        resultLength = result.length;
                    for (let i = 0; i < resultLength; i++) {
                        let r = result[i].match(patternStyleguideDetail),
                            number = parseFloat(r[1]),
                            sectionNumber = Math.floor(number);
                        data.push({
                            number: number,
                            title: r[2],
                            content: markdown.render(r[3]),
                            link: sectionNumber === 0 ? 'index.html' : 'section-' + sectionNumber + '.html',
                            sectionNumber: sectionNumber,
                            isOverview: Number.isInteger(number)
                        });
                    }
                }
                if (srcFilesCompleteCount >= srcFilesLength) {
                    if (param.isOutput) {
                        output(param, data);
                    } else {
                        callback(param, data);
                    }
                }
            });
        }

    });
};
