/**
 *
 * Output
 * @param {object} param
 * @param {object} data
 * @return {promise}
 *
 */

const chalk = require('chalk');
const ejs = require('ejs');
const fs = require('fs-extra');

module.exports = (param, data) => {
  return new Promise((resolve) => {
    let sectionNumbers = data.map((d) => {
      return d.sectionNumber;
    });
    sectionNumbers = sectionNumbers.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });
    data.sort((a, b) => {
      if (a.sectionNumber === b.sectionNumber) {
        return (a.subSectionNumber < b.subSectionNumber ? -1 : 1);
      } else {
        return (a.sectionNumber < b.sectionNumber ? -1 : 1);
      }
    });
    resolve(sectionNumbers);
  }).then((sectionNumbers) => {
    const processing = [];
    for (let i = 0; i < sectionNumbers.length; i++) {
      processing.push(new Promise((resolve, reject) => {
        const destFileName = sectionNumbers[i] === 0 ? 'index.html' : 'section-' + sectionNumbers[i] + '.html';
        ejs.renderFile(param.template, {
          getSections: (sectionNumber) => {
            if (sectionNumber === undefined) {
              return data.filter((x) => {
                return x.isOverview;
              });
            } else {
              return data.filter((x) => {
                return x.isOverview && (x.sectionNumber === sectionNumber);
              });
            }
          },
          getSubSections: (sectionNumber) => {
            if (sectionNumber === undefined) {
              return data.filter((x) => {
                return !x.isOverview;
              });
            } else {
              return data.filter((x) => {
                return !x.isOverview && (x.sectionNumber === sectionNumber);
              });
            }
          },
          hasSubSections: (sectionNumber) => {
            if (sectionNumber === undefined) {
              return false;
            } else {
              return data.filter((x) => {
                return !x.isOverview && (x.sectionNumber === sectionNumber);
              }).length ? true : false;
            }
          },
          getContents: (sectionNumber) => {
            if (sectionNumber === undefined) {
              return [];
            } else {
              return data.filter((x) => {
                return x.sectionNumber === sectionNumber;
              });
            }
          },
          currentSectionNumber: sectionNumbers[i]
        }, (err, str) => {
          if (err) {
            reject(err);
          } else {
            fs.outputFile(param.dest + destFileName, str, (err) => {
              if (err) {
                reject(err);
              } else {
                console.log(chalk.green('Output: ' + param.dest + destFileName));
                resolve();
              }
            });
          }
        });
      }));
    }
    return Promise.all(processing);
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
