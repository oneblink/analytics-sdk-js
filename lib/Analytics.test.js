/* @flow */
'use strict'

const Analytics = require('./Analytics.js')

describe('./lib/Analytics.js', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('new Analytics()', () => {
    test('when we initialise an Analytics object without passing in an "options" parameter, we get a meaningful error', () => {
      expect(() => {
        // $FlowFixMe
        new Analytics() // eslint-disable-line no-new
      }).toThrow('must supply an Access Key')
    })
    test('when we initialise an Analytics object with a bad looking access key, we get a meaningful error', () => {
      expect(() => {
        new Analytics({ // eslint-disable-line no-new
          // $FlowFixMe
          accessKey: 87698769876,
          secretKey: 'MzRkYzNiZGYxMWVmNjZiYmJmNGRjNmUwNTIyODRlODE=',
          origin: 'http://localhost:3000'
        })
      }).toThrow('Access Key must be a string')
    })
    test('when we initialise an Analytics object without a Secret Key, we get a meaningful error', () => {
      expect(() => {
        new Analytics({ // eslint-disable-line no-new
          accessKey: '58d87ee9cd6b9d0ee73c83f7',
          origin: 'http://localhost:3000'
        })
      }).toThrow('must supply an Secret Key')
    })
    test('when we initialise an Analytics object with a bad looking Secret Key, we get a meaningful error', () => {
      expect(() => {
      // $FlowFixMe
        new Analytics({ // eslint-disable-line no-new
          accessKey: '58d87ee9cd6b9d0ee73c83f7',
          secretKey: 87698769876,
          origin: 'http://localhost:3000'
        })
      }).toThrow('Secret Key must be a string')
    })
  })
})
