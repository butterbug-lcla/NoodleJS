const EventEmitter = require('events').EventEmitter
const DispatchStream = require('./DispatchStream')
const ffmpeg = require('fluent-ffmpeg')

class Dispatcher extends EventEmitter {
    constructor(client) {
        super()
        this.client = client
        this.connection = this.client.connection
    }

    playFile(filename, voiceTarget) {
        this.play(filename, voiceTarget)
    }

    playStream(stream, voiceTarget) {
        this.play(stream, voiceTarget)
    }

    play(unknown, voiceTarget) {
        this.dispatchStream = new DispatchStream(this.connection, voiceTarget)
        this.dispatchStream.once('finish', () => {
            this.emit('end')
        })
        unknown.pipe(this.dispatchStream)
        // this.command.run()
    }

    setVolume(volume) {
        this.dispatchStream.volume = volume
    }

    getVolume() {
        return this.dispatchStream.volume
    }

    stopStream() {
        if(this.dispatchStream)
            this.dispatchStream.close()
    }

    stop() {
        // if (this.command)
        //     this.command.kill()
    }
}

module.exports = Dispatcher
