const CONFIG = require('./Config');
const fs = require('fs');
const pino = require('pino');

const LOG_DIR = `${__dirname}/../../logs`;
const PINO_OPTS = {
    level: CONFIG.LOG.LEVEL.toLowerCase(),
    timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
    redact: {
        paths: ['[*].KEYS.API','[*].KEYS.SECRET'],
        censor: '**********'
    },
    prettyPrint: CONFIG.LOG.PRETTY_PRINT,
    useLevelLabels: true,
    base: null
};

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)){
    fs.mkdirSync(LOG_DIR);
}


const Loggers = {
    'performance': pino(PINO_OPTS, pino.destination(`${LOG_DIR}/performance.log`)),
    'execution': pino(PINO_OPTS, pino.destination(`${LOG_DIR}/execution.log`))
};

module.exports = Loggers;
