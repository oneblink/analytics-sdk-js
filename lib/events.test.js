/* @flow */
'use strict'

describe('./lib/events.js', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('log()', () => {
    test('it should send the correct parameters to fetch()', () => {
      expect.assertions(6)
      jest.mock('node-fetch', () => {
        return (url, options) => {
          expect(url).toBe('origin/events')
          const body = JSON.parse(options.body)
          expect(body.events[0].name).toBe('event name')
          expect(body.events[0].tags).toEqual({ test: 123 })
          expect(options.headers).toEqual({
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
          })
          expect(options.method).toBe('POST')
          return Promise.resolve({
            status: 200,
            json: () => Promise.resolve('return value')
          })
        }
      })

      const events = require('./events.js')
      return events.log(
        'origin',
        'token',
        'event name',
        [{ test: 123 }]
      )
        .then((value) => {
          expect(value).toBe('return value')
        })
    })

    test('it should reject if fetch() does not return a 200 response', () => {
      jest.mock('node-fetch', () => {
        return (url, options) => Promise.resolve({
          status: 400,
          json: () => Promise.resolve('error message')
        })
      })

      const events = require('./events.js')
      return events.log(
        'origin',
        'token',
        'event name',
        [{ test: 123 }]
      )
        .catch((error) => {
          expect(error.message).toBe('An error occurred while logging the event(s): error message')
        })
    })
  })
})
