const chalk = require('chalk');
const cpx = require('cpx');
const render = require('./util/render');

/**
 *
 * output
 * @param {object} param    command line param
 * @param {object} data     basic data for ejs
 *
 */

module.exports = (param, data) => {
    // copy assets files
    cpx.copy(param.template + '/assets/**', param.dest + '/assets/', (err) => {
        if (err) {
            console.error(chalk.red(err));
        } else {
            console.log(chalk.green('Complete: Copy of assets files'));
        }
    });
    // sort by number
    data.sort((a, b) => {
        return (a.number < b.number ? -1 : 1);
    });
    let sectionNumbers = data.map((data) => data.number),
        sectionNumbersLength = sectionNumbers.length;
    // all to integers
    for (let i = 0; i < sectionNumbersLength; i++) {
        sectionNumbers[i] = Math.floor(sectionNumbers[i]);
    }
    // delete the same thing
    sectionNumbers = sectionNumbers.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    sectionNumbersLength = sectionNumbers.length;
    // generate html for each section
    for (let i = 0; i < sectionNumbersLength; i++) {
        let destFileName = sectionNumbers[i] === 0 ? 'index.html' : 'section-' + sectionNumbers[i] + '.html'; 
        render(param.template + '/index.ejs', param.dest + '/' + destFileName, {
            getOverviewList: (sectionNumber) => {
                if (sectionNumber === undefined) {
                    return data.filter(function (x) {
                        return x.isOverview;
                    });
                } else {
                    return data.filter(function (x) {
                        return x.isOverview && (x.sectionNumber === sectionNumber);
                    });
                }
            },
            getOverviewChildList: (sectionNumber) => {
                if (sectionNumber === undefined) {
                    return data.filter(function (x) {
                        return !x.isOverview;
                    });
                } else {
                    return data.filter(function (x) {
                        return !x.isOverview && (x.sectionNumber === sectionNumber);
                    });
                }
            },
            hasOverviewChildList: (sectionNumber) => {
                if (sectionNumber === undefined) {
                    return false;
                } else {
                    return data.filter(function (x) {
                        return !x.isOverview && (x.sectionNumber === sectionNumber);
                    }).length ? true : false;
                }
            },
            getSection: (sectionNumber) => {
                if (sectionNumber === undefined) {
                    return [];
                } else {
                    return data.filter(function (x) {
                        return x.sectionNumber === sectionNumber;
                    });
                }
            },
            currentSectionNumber: sectionNumbers[i]
        });
    }
};
