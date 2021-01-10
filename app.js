const EventEmitter = require('events');

const Logger = require('./logger')
const logger = new Logger();
logger.on('messageLogged', (arg) => {
    console.log('Listener Logged '+ arg);
})
logger.log('This is a dummy message');