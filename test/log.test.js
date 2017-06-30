/* @flow */
'use strict'

const jwt = require('jsonwebtoken')

// Matches the key in the db
// SEE:
// ./service/simple-analytics/scripts/mongo-setup.js
// ./service/simple-analytics/lib/models/Key.js
// ./service/simple-analytics/lib/models/Organisation.js
const ACCESS_KEY = '58dc86987e2c7853a6cdf008'
const SECRET_KEY = 'SECRET_KEY'

const eventToLog = [
  {
    name: 'TEST_EVENT',
    __v: 0
  }
]

const secret = SECRET_KEY
// NOTE: This "iss" will change when the container is rebuilt
const token = jwt.sign(
  {
    iss: ACCESS_KEY,
    exp: Date.now() + 10000
  },
  secret
)

describe('log()', () => {
  test('it should return a 200 response', () => {
    const events = require('../lib/events.js')
    expect.assertions(1)
    return events
      .log('http://localhost:3000', token, 'TEST_EVENT', eventToLog)
      .then(res => {
        if (res !== null && res !== undefined) {
          return expect(res.events[0].name).toBe('TEST_EVENT')
        } else {
          return expect(false).toBe(true) // Is there a better way to fail a Jest test?
        }
      })
  })
})
