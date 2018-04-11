const cheerio = require('cheerio')
const moment = require('moment')
const https = require('https')

module.exports = class Summary {
  constructor(program) {
    this.contributionUrl = `https://github.com/users/${
      program.github
    }/contributions`
  }
  send() {
    https
      .get(this.contributionUrl, response => {
        response.setEncoding('utf8')
        let output = ''
        response.on('data', raw => {
          output += raw
        })

        response.on('end', () => {
          const today = moment().format('YYYY-MM-DD')

          const $ = cheerio.load(output)
          const contributions = $(`[data-date=${today}]`).data('count') || 0
          const text = {
            text: `Summary of ${today} \nGithub contributions: ${contributions}`
          }

          const SlackNotifier = require('./slack-notifier')
          const SlackNotifierInstance = new SlackNotifier(text)

          SlackNotifierInstance.send()
        })
      })
      .on('error', e => {
        console.error(`error: ${e.message}`)
      })
  }
}
