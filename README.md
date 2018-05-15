# styleguide-lite

Simple Styleguide Generator.

[![NPM](https://nodei.co/npm/styleguide-lite.png)](https://nodei.co/npm/styleguide-lite/)
[![Build Status](https://travis-ci.org/isaxxx/styleguide-lite.svg?branch=master)](https://travis-ci.org/isaxxx/styleguide-lite)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Installation

### npm

```bash
$ npm install styleguide-lite --save
```

## Usage

```
Options:
  --src, -s       src files path pattern. [string] [default: "./src/scss/**/*.scss"]
  --dest, -d      dest directory path. [string] [default: "./dest/styleguide"]
  --template, -t  template directory path. [string] [default: __dirname + "/template"]
  --isOutput      Whether to output. [boolean] [default: true]
  --version, -v   show this version. [boolean]
  --help, -h      show this help. [boolean]
```



## Example

##### CLI

```bash
$ styleguide-lite -s ./src/css/**/*.css -d ./styleguide/ -t ./template/
```

##### ./src/css/app.css

```css
/*
===
0 Overview
===
Overview text.
*/
```

##### API

```js
const styleguideLite = require('styleguide-lite');

styleguideLite({
  src: './src/scss/**/*.scss',
  isOutput: false
}, (param, data) => {
  console.log(data);
});
```

For more in depth documentation see: https://isaxxx.com/works/styleguide-lite/

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
