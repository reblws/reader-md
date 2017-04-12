# Markdown Reader for Standard Notes

A custom [Standard Notes](https://standardnotes.org/) editor made for viewing markdown-formatted documents. This is for people who like to read back on already-formatted notes. The font-size dynamically changes its size depending on the width of the window.


## Usage
In the Standard Notes app, open the *Editor* tooltip and paste the following under *Add new editor via URL*:

```https://reblws.github.io/reader-md/md_reader.html?name=Markdown Reader```

This URL will be up-to-date with any changes made in the master branch of this repo.

## Installation

Installing this editor requires [node](https://nodejs.org/) and [npm](https://www.npmjs.com/) to get started. 

To install the editor on your computer, clone the project, navigate to the cloned folder and then run:

```
$ npm install
```

Webpack is used to bundle ```app/index.js``` and its required dependencies into a single bundled JS file. To compile any changes made to ```app/index.js```, run:

```
$ npm run build
```

A bundled JS file will appear in ```dist/bundle.min.js```

## Dependencies
- [flowtype-js](https://www.npmjs.com/package/flowtype-js) for responsive text sizing at various element widths
- [remarkable](https://github.com/jonschlinkert/remarkable) for markdown parsing
- [highlight.js](https://highlightjs.org/) for syntax highlighting
