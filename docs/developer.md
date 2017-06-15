# Development

## Dependencies

### BlinkMobile

- [Simple Analytics](https://git.blinkm.co/blinkmobile-nextgen/simple-analytics)

You'll want to develop against an instance of Simple Analytics running locally. See the [developer docs](https://git.blinkm.co/blinkmobile-nextgen/simple-analytics/blob/master/docs/developer.md) for guidance on how to run Simple Analytics locally using Docker.

### Dev

- [NodeJS v6.x](https://nodejs.org/en/)

## Running Analytics SDK Locally

If you want to use the SDK in contex, you'll probably make a simple project and `npm link` a local clone of the repo.

[1] Clone the `analytics-sdk-js` repo locally

```
git clone git@github.com:blinkmobile/analytics-sdk-js.git
```

[2] Make a simple project:

```
mkdir analytics-sdk-test-project
cd analytics-sdk-test-project
```

[3] Use our fork of @jokeyrhyme's convenient script to set it up as a Blink-ready project (`npm install -g https://github.com/blinkmobile/node-init.js` if you don't already have it installed)

```
node-init
```
[4] Populate `index.js` with the example code in the [README.md](../README.md).

[5] Hard code in the config values

A confession: The script that populates the Simple Analytics MongoDB with development data creates new keys each time it is run. Not ideal from a documentation perspective. You'll need to get the Access Key and Secret Key from the running MongoDB instance running at http://localhost:2001 (if you've installed Simple Analytics using `docker-compose` as suggested above).

```
$ mongo --host=localhost:2001

...

> use global
switched to db global
> db["keys"].find().pretty()
{
        "_id" : ObjectId("59475a0f319d0b000f0f6610"),
        "secret" : "FAKE_SECRET",
        "name" : "Blink Analyst",
        "privilege" : {
                "ANALYTICS" : "COLLECTOR"
        },
        "links" : {
                "organisations" : ObjectId("59475a0e319d0b000f0f660f")
        },
        "__v" : 0
}
>
```

The Access Key is the value of the "_id" and the Secret Key is the value of "secret" - always "FAKE_SECRET".

Based on the values above, the config values in `index.js` would be:

```
ANALYTICS_ACCESS_KEY = '59475a0f319d0b000f0f6610'
ANALYTICS_SECRET_KEY = 'FAKE_SECRET'
ANALYTICS_URL = 'http://localhost:2000'
```

[6] With [npm link](https://docs.npmjs.com/cli/link), link in the local analytics-sdk-repo.

```
npm link ./PATH/TO/analytics-sdk-js
```

[7] Test it by running your `index.js` (using VSCode debug perhaps)

The code should run successfully and an event should go into the MongoDB database running on http://localhost:2001. The events will go into a new database named after the Access Key.

```
$ mongo --host=localhost:2001

...

> show databases
59475a0e319d0b000f0f660f  0.000GB
admin                     0.000GB
global                    0.000GB
local                     0.000GB
> use 59475a0e319d0b000f0f660f
switched to db 59475a0e319d0b000f0f660f
> show collections
59475a0f319d0b000f0f6610
> db["59475a0f319d0b000f0f6610"].find().pretty()
{
        "_id" : ObjectId("5947730d27baef000f78e9cd"),
        "name" : "Server CLI Request",
        "tags" : {
                "value" : 1497854731511,
                "label" : "HowTo",
                "action" : "Start",
                "category" : "Videos"
        },
        "date" : ISODate("2017-06-19T06:45:32.994Z"),
        "__v" : 0
}
>
```

Once it's working as expected, changes you make in your local `analytics-sdk-js` repo will be instantly available to your `analytics-sdk-local-project` that links to it.

