const chalk = require('chalk');

const { log } = console;

module.exports = {
  info: (msg) => {
    log(chalk.cyan(`${msg}`));
  },
  remind: (msg) => {
    log(chalk.yellow(`${msg}`));
  },
  alert: (msg) => {
    log(chalk.red(`ERR: ${msg}`));
  },
};
