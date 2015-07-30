const methodist = require('./')
const noop = require('noop2')
const test = require('tape')

test('should throw if unknown method is bound', function (t) {
  t.plan(1)
  t.throws(methodist.bind(null, {}, noop, { foo: 'bar'}), /invalid method/)
})

test('should be curried', function (t) {
  t.plan(1)

  const r1 = methodist('get')
  const r2 = r1(noop)
  const r3 = r2({ all: callFn })
  r3()

  function callFn () {
    t.pass('called')
  }
})

test('should always match any or all', function (t) {
  t.plan(2)

  const r1 = methodist({}, noop, { all: callFn })
  const r2 = methodist({}, noop, { any: callFn })
  r1()
  r2()

  function callFn () {
    t.pass('called')
  }
})

test('should accept an object with a method property', function (t) {
  t.plan(1)

  const r1 = methodist({method: 'get'}, noop, { get: callFn })
  r1()

  function callFn () {
    t.pass('called')
  }
})

test('should accept a string', function (t) {
  t.plan(1)

  const r1 = methodist('get', noop, { get: callFn })
  r1()

  function callFn () {
    t.pass('called')
  }
})

test('should lowercase argument names', function (t) {
  t.plan(2)

  const r1 = methodist('GET', noop, { get: callFn })
  const r2 = methodist({ method: 'GET' }, noop, { get: callFn })
  r1()
  r2()

  function callFn () {
    t.pass('called')
  }
})

test('should default to defaultFn', function (t) {
  t.plan(2)

  const r1 = methodist('GET', defaultFn, {})
  r1()

  const r2 = methodist('GET', { default: defaultFn }, {})
  r2()

  function defaultFn () {
    t.pass('called')
  }
})
