<h1 align="center">Edit URL</h1>
<p align="center"> Utility function that allows <i>sync</i> and <i>async</i> manipulations on <b>URL strings</b>.</p>

## Features

- Fully tested
- Asynchronous manipulations
- ES6

## Installation

```sh
$ npm install --save edit-url
```

## Usage

### Import

```javascript
const editURL = require('edit-url');
```

### Sync

```javascript
editURL('http://google.com/', (obj) => obj.query.q = "Node.JS"); // http://google.com/?q=Node.JS
```

### Async

```javascript
editURL('http://localhost/', (obj, cb) => {
    findAvailablePort((port)=> {
    	obj.port = port;
    });
}), (edited) => {
	console.info(edited); // http://localhost:14036/
});
```

## Dependencies

It uses Node's ``url `` module and has no external dependency.

Mocha is use for the tests