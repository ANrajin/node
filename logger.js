const EventEmitter = require('events');

class Logger extends EventEmitter{
    url = "http://chromaticbd.com";

    log(message){
        console.log(message)

        //Raise the Listener 
        this.emit('messageLogged', { id: 1, url: this.url});
    }
}

module.exports = Logger;