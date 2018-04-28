# day-summary

Summarizes your achievements for the day and reports back to you on slack

## Setup

Add slack `Incoming Webhook` integration [here](https://api.slack.com/incoming-webhooks).

## Environment variable

* `DAY_SUMMARY_HOOK_URL` : Incoming webhook url for slack notification.

## How to use

```
$ node lib/index.js --github 'USER_NAME' --schedule 'CRON_PATTERN'
```

To run the script continuously:

```
$ forever lib/index.js --github 'USER_NAME' --schedule 'CRON_PATTERN'
```

## Options

```
--github <string>    Add github username
--schedule [string]  cron pattern, defaults to 20:00 every day (default: 00 20 * * *)
-h, --help           output usage information
```

### Cron-style Scheduling

https://github.com/node-schedule/node-schedule#cron-style-scheduling

## TODO

* [ ] add PR titles for the day
* [ ] need more contents
