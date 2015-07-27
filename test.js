const methodist = require('./')
const test = require('tape')

test('should throw if unknown method is bound', function (t) {
  t.plan(2)
  t.throws(methodist.bind(null, {}, { foo: 'bar'}), /invalid method/)
  t.doesNotThrow(methodist.bind(null), /invalid method/)
})

test('should default to any or all', function (t) {
  t.plan(2)

  const r1 = methodist({}, { all: callFn })
  const r2 = methodist({}, { any: callFn })
  r1()
  r2()

  function callFn () {
    t.pass('called')
  }
})

test('should accept an object with a method property', function (t) {
  t.plan(1)

  const r1 = methodist({method: 'get'}, { get: callFn })
  r1()

  function callFn () {
    t.pass('called')
  }
})

test('should accept a string', function (t) {
  t.plan(1)

  const r1 = methodist('get', { get: callFn })
  r1()

  function callFn () {
    t.pass('called')
  }
})

test('should lowercase argument names', function (t) {
  t.plan(2)

  const r1 = methodist('GET', { get: callFn })
  const r2 = methodist({ method: 'GET' }, { get: callFn })
  r1()
  r2()

  function callFn () {
    t.pass('called')
  }
})

