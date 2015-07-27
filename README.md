# methodist
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

HTTP method matching.

## Installation
```bash
$ npm install methodist
```

## Usage
```js
const methodist = require('methodist')
const wayfarer = require('wayfarer')
const http = require('http')

const router = wayfarer()
const server = http.createServer((req, res) => {
  wayfarer.on('/hello', methodist(req, {
    all: params => console.log('any route matches'),
    get: params => console.log('get')
  }))
})

server.listen(1337)
```

## API
### methodist(method, routes)
Call a callback based on `method` or `req.method`. Routes is an object where
the keys are one of [methods](https://github.com/jshttp/methods), `all` or
`any`. `all` and `any` are checked before other methods. Methods are normalized
to lowercase.

## See Also
- [wayfarer](https://github.com/yoshuawuyts/wayfarer)
- [methods](https://github.com/jshttp/methods)
- [course](https://github.com/hughsk/course)
- [iojs/http](https://iojs.org/api/http.html)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/methodist.svg?style=flat-square
[npm-url]: https://npmjs.org/package/methodist
[travis-image]: https://img.shields.io/travis/yoshuawuyts/methodist/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/methodist
[codecov-image]: https://img.shields.io/codecov/c/github/yoshuawuyts/methodist/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yoshuawuyts/methodist
[downloads-image]: http://img.shields.io/npm/dm/methodist.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/methodist
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
