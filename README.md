# styleguide-lite

Simple Styleguide Generator.

[![NPM](https://nodei.co/npm/styleguide-lite.png)](https://nodei.co/npm/styleguide-lite/)
[![Build Status](https://travis-ci.org/isaxxx/styleguide-lite.svg?branch=master)](https://travis-ci.org/isaxxx/styleguide-lite)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Installation

### NPM

```bash
$ npm install styleguide-lite --save
```

## Usage

### CLI

```
Options:
  --src           src files path pattern. [string] [default: './src/scss/**/*.scss']
  --dest          dest directory path. [string] [default: './dest/assets/styleguide/']
  --template      template file path. [string] [default: __dirname + '/template/index.ejs']
  --version, -v   show this version. [boolean]
  --help, -h      show this help. [boolean]
```

```bash
$ styleguide-lite --src ./src/css/**/*.css --dest ./dest/assets/styleguide/ --template ./template/index.ejs
```

### JavaScript

```js
styleguideLite({
  src: ['./src/scss/**/*.scss'],
  dest: './dest/assets/styleguide/',
  templete: './template/index.ejs'
}).then(() => {
  console.log('complete!!');
});
```

### CSS or SCSS

```css
/*
===
<Section Number>.<Sub Section Number> <Title>
===
<Markdown>
*/

/*
===
0.0 Overview
===
Here markup text.
*/

/*
===
0.1 Detail
===
Here markup text.
*/

/*
===
1.0 Sample
===
Here markup text.
*/
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
