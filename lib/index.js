const program = require('commander')
const schedule = require('node-schedule')
const Summary = require('./summary')

program
  .version('0.1.0')
  .option('--github <string>', 'Add github username')
  .option(
    '--schedule [string]',
    'cron pattern, defaults to 20:00 every day',
    '00 20 * * *'
  )
  .parse(process.argv)

const pattern = program.schedule || '00 20 * * *'

if (!process.env.DAY_SUMMARY_HOOK_URL)
  throw new Error('Please provide Slack incoming webhook URL')
if (program.github)
  throw new Error('Please provide github username with --github option')

const j = schedule.scheduleJob(pattern, () => {
  const SummaryInstance = new Summary(program)
  SummaryInstance.send()
})
