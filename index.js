const methods = require('methods')
const assert = require('assert')

const meths = methods.concat(['any', 'all'])

module.exports = methodist

// Call a callback based on `method`
// (obj, obj) -> fn
function methodist (method, routes) {
  method = typeof method === 'object' ? method.method : method
  if (typeof method === 'string') method = method.toLowerCase()
  routes = routes || {}
  assertKeys(routes)

  return function () {
    if (routes['any']) return routes['any'](arguments)
    if (routes['all']) return routes['all'](arguments)
    routes[method] && routes[method](arguments)
  }
}

// assert object keys
// obj -> null
function assertKeys (routes) {
  Object.keys(routes).forEach(function (route) {
    assert.ok(meths.indexOf(route) !== -1, route + ' is an invalid method')
  })
}
