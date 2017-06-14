var test = require('tape')
var enc = require('dat-encoding')
var datResolve = require('..')

var key = '7a9225a79f68f0a41d2d20c1827408eb25d5d8fecd4f49cfc8dfd97d0d0c004'
// Strings that do not require lookup
var stringKeys = [
  {type: 'valid', key: key},
  {type: 'valid', key: 'datproject.org/' + key},
  {type: 'valid', key: 'datproject.org/' + key + '/'},
  {type: 'valid', key: 'dat://' + key},
  {type: 'valid', key: 'dat://' + key + '/'},
  {type: 'valid', key: 'host.com/whatever/' + key},
  {type: 'valid', key: 'host.com/whatever/' + key + '/'},
  {type: 'valid', key: 'master.datproject.org/' + key},
  {type: 'valid', key: 'master.datproject.org/' + key + '/'},
  {type: 'valid', key: 'http://datproject.org/' + key},
  {type: 'valid', key: 'http://datproject.org/' + key + '/'},
  {type: 'valid', key: 'http://host.com/whatever/' + key},
  {type: 'valid', key: 'http://host.com/whatever/' + key + '/'},
  {type: 'valid', key: 'http://master.datproject.org/' + key},
  {type: 'valid', key: 'http://master.datproject.org/' + key + '/'},
  {type: 'valid', key: 'https://master.datproject.org/' + key},
  {type: 'valid', key: 'https://master.datproject.org/' + key + '/'},
  {type: 'valid', key: Buffer.from(key, 'hex')}
]

test('resolve key without http', function (t) {
  t.plan(3 * stringKeys.length) // 3 tests for each key
  stringKeys.forEach(function (testCase) {
    datResolve(testCase.key, function (err, newKey) {
      t.error(err, 'no error')
      t.equal(newKey, key, 'link correct')
      t.ok(enc.encode(newKey), 'valid key')
    })
  })
})

test('resolve beaker browser', function (t) {
  datResolve('beakerbrowser.com', function (err, key) {
    t.error(err, 'no error')
    t.ok(key, 'got key')
    t.end()
  })
})
