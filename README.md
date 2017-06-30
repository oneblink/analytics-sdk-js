# @blinkmobile / analytics-sdk-js

The javascript SDK for sending custom events to the BlinkMobile Simple Analytics service.

If you are a BlinkMobile customer, you can access your analytics through the [BlinkMobile Analytics Console](https://console.blinkm.io) or your custom installation if you have one. For more information, please contact support@blinkmobile.com.au.

Please Note: This is only just out of alpha release. It is currently being used by a number of BlinkMobile NodeJS projects. It has not yet been tested on client-side projects. If you have a special requirement, please [request a feature](https://github.com/blinkmobile/analytics-sdk-js/issues).

## Installation

```
npm install --save @blinkmobile/analytics-sdk
```

## Keys

You will need an Access Key and a Secret Key for the Simple Analytics service. Please contact support@blinkmobile.com.au for keys.

## Usage

Start by setting up your configuration and initialising a "collector".

```
// [1] Require in the SDK
const Analytics = require('@blinkmobile/analytics-sdk')

// [2] Set your keys and Simple Analytics service URL
const ANALYTICS_ACCESS_KEY = 'my-api-project'
const ANALYTICS_SECRET_KEY = '887659807=3124hjkgf987hjgf77t876t876g'
const ANALYTICS_URL = 'https://analytics.blinkm.io'

// [3] Initialise the Analytics collector object
const collector = new Analytics({
  accessKey: ANALYTICS_ACCESS_KEY,
  secretKey: ANALYTICS_SECRET_KEY,
  origin: ANALYTICS_URL
})
```

Your events must be an object but they can have any form you like. The events below are based on [Google Analytics events](https://support.google.com/analytics/answer/1033068?hl=en).

To send a single custom event with the `logEvent()` method:

```
// Format your event
const formattedEvent = {
  category: "Videos",
  action: "Start",
  label: "HowTo",
  value: Date.now()
}

// Log your event
collector.logEvent("Server CLI Request", formattedEvent)
  .then((analyticsEvent) => {
    // The logEvent() method returns a Promise
    // that resolves to the event
    // sent to the analytics service
    console.log(analyticsEvent)
  })
  .catch((err) => {
    throw Error(err)
  })
```

To send multiple events with the `logEvents()` method:

```
// Format your events into an array
const formattedEvents =
[
  {
    category: "Videos",
    action: "Start",
    label: "HowTo",
    value: 1497509263823
  },
  {
    category: "Videos",
    action: "Stop",
    label: "HowTo",
    value: 1497509350209
  }
]

// Log your events
collector.logEvents("Server CLI Request", formattedEvents)
  .then((analyticsEvent) => {
    // The logEvents() method returns a Promise
    // that resolves to whatever was
    // returned from the Simple Analytics service,
    // currently the array of events that
    // was sent to Simple Analytics
    console.log(analyticsEvent)
  })
  .catch((err) => {
    throw Error(err)
  })
```

## Support

Contributions on [GitHub](https://github.com/blinkmobile/analytics-sdk-js) are welcome. Please [fork the repo](https://youtu.be/5oJHRbqEofs?list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-) and make a [pull request](https://youtu.be/d5wpJ5VimSU?list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-).

If you have a problem, please [make an issue](https://github.com/blinkmobile/analytics-sdk-js/issues) and we'll give it our full attention.
