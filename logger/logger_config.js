const winston = require('winston');

const loggerWinston = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({filename:'warn.log', level:'warn'}),
        new winston.transports.File({filename:'error.log', level:'error'})
    ]
});

module.exports = loggerWinston;