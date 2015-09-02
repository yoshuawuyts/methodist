const methods = require('methods')
const assert = require('assert')
const curry = require('curry')

const meths = methods.concat(['any', 'all'])

module.exports = curry(methodist)

// Call a callback based on `method`
// (obj, fn, obj) -> fn
function methodist (method, defaultFn, routes) {
  if (typeof method === 'object') method = method.method
  assert.equal(typeof method, 'string')
  method = method.toLowerCase()

  if (defaultFn && defaultFn.default) defaultFn = defaultFn.default
  if (defaultFn && defaultFn._default) defaultFn = defaultFn._default
  assert.equal(typeof defaultFn, 'function')

  assert.equal(typeof routes, 'object')
  routes = routes
  assertKeys(routes)

  return function () {
    if (routes[method]) return routes[method].apply(null, arguments)
    if (routes['any']) return routes['any'].apply(null, arguments)
    if (routes['all']) return routes['all'].apply(null, arguments)
    defaultFn.apply(null, arguments)
  }
}

// assert object keys
// obj -> null
function assertKeys (routes) {
  Object.keys(routes).forEach(function (route) {
    assert.ok(meths.indexOf(route) !== -1, route + ' is an invalid method')
  })
}
