const winston = require('winston');
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.File({
      filename: 'log/combined.log',
      level: 'info'
    })
  ]
});
module.exports = logger;
