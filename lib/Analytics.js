/* @flow */
'use strict'

/* ::
import type {
  AnalyticsConstructorOptions
} from '..'
*/

const jwt = require('jsonwebtoken')

const events = require('./events.js')

class Analytics {
  /* ::
  _token: string
  _origin: string
  */

  constructor (
    options /* : AnalyticsConstructorOptions */
  ) {
    options = options || {}
    if (!options.accessKey) {
      throw new TypeError('must supply an Access Key')
    }
    if (typeof options.accessKey !== 'string') {
      throw new TypeError('Access Key must be a string')
    }
    if (!options.secretKey) {
      throw new TypeError('must supply an Secret Key')
    }
    if (typeof options.secretKey !== 'string') {
      throw new TypeError('Secret Key must be a string')
    }
    this._origin = options.origin || 'https://analytics.blinkm.io'
    this._token = jwt.sign({
      iss: options.accessKey,
      exp: Date.now() + 10000 // expires in 10 seconds
    }, options.secretKey)
  }

  logEvents (
    name /* : string */,
    eventObjs /* : Array<Object> */
  ) /* : Promise<void> */ {
    return events.log(this._origin, this._token, name, eventObjs)
  }

  logEvent (
    name /* : string */,
    eventObj /* : Object */
  ) /* : Promise<void> */ {
    if (!name) {
      throw new TypeError('must supply an event name')
    }
    if (typeof name !== 'string') {
      throw new TypeError('event name must be a string')
    }
    return this.logEvents(name, [eventObj])
  }
}

module.exports = Analytics
