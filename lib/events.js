/* @flow */
'use strict'

const fetch = require('node-fetch')

function log (
  origin /* : string */,
  token /* : string */,
  name /* : string */,
  events /* : Array<Object> */
) /* : Promise<void> */ {
  return fetch(
    `${origin}/events`,
    {
      method: 'POST',
      body: JSON.stringify({
        'events': events.map((event) => ({
          name,
          date: new Date(),
          tags: event
        }))
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
    .then((res) => {
      return res.json()
        .then((body) => {
          if (res.status !== 200) {
            return Promise.reject(new Error(`An error occurred while logging the event(s): ${JSON.stringify(body)`))
          } else {
            return body
          }
        })
    })
}

module.exports = {
  log
}
