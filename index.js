const methods = require('methods')
const assert = require('assert')
const curry = require('curry')

const meths = methods.concat(['any', 'all'])

module.exports = curry(methodist)

// Call a callback based on `method`
// (obj, obj) -> fn
function methodist (method, defaultFn, routes) {
  method = typeof method === 'object' ? method.method : method
  if (typeof method === 'string') method = method.toLowerCase()
  defaultFn = defaultFn.default ? defaultFn.default : defaultFn
  routes = routes || {}
  assertKeys(routes)

  return function () {
    if (routes[method]) return routes[method](arguments)
    if (routes['any']) return routes['any'](arguments)
    if (routes['all']) return routes['all'](arguments)
    defaultFn(arguments)
  }
}

// assert object keys
// obj -> null
function assertKeys (routes) {
  Object.keys(routes).forEach(function (route) {
    assert.ok(meths.indexOf(route) !== -1, route + ' is an invalid method')
  })
}
