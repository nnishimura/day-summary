const request = require('request')

const headers = {
  'Content-Type': 'application/json'
}

const DEFAULT_FORM = {
  text: 'default message',
  username: 'day-summary-bot',
  icon_emoji: ':bar_chart:'
}

const DEFAULT_PARAMS = {
  method: 'POST',
  url: process.env.DAY_SUMMARY_HOOK_URL,
  form: 'payload=',
  headers,
  json: true
}

module.exports = class SlackNotifier {
  constructor(f) {
    const form = Object.assign(DEFAULT_FORM, f)

    DEFAULT_PARAMS.form = `${DEFAULT_PARAMS.form}${JSON.stringify(form)}`
    this.options = DEFAULT_PARAMS
  }

  send() {
    request.post(this.options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        return console.log(body)
      }

      console.log('error: ' + response)
    })
  }
}
