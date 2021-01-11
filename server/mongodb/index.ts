import * as mongoose from "mongoose";

const event = require('events')
const config = require('../config')
mongoose.set('useCreateIndex', true)

const url = `mongodb://${config.db.domain}:${config.db.port}/${config.db.database}`


export default {
    connect(){
        const emitter = new event.EventEmitter()
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(mongoose => {
            emitter.emit('success',mongoose)
        }).catch(async (err) => {
            await  mongoose.disconnect();
            emitter.emit('failed',err)
        })
        mongoose.connection.on('close', async  function () {
            emitter.emit('close')
        })
        return emitter
    }
}