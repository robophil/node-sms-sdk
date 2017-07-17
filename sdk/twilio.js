const configStore = require('../config-store')
const twilio = require('twilio')
const key = 'twilio'

let client = null

module.exports = {

    loadConfig: () => {
        let conf = null
        if (configStore.has(key) && configStore.get(key).accountSid && configStore.get(key).accountSid) {
            conf = configStore.get(key)
            client = new twilio(conf['accountSid'], conf['authToken'])
            return loaded = true
        } else {
            return false
        }
        console.log(conf, client)
    },

    raw: () => {
        if (client != null) return client
        else return new Error("sdk hasn't been loaded")
    },

    send: ({ from, to, body }) => {
        console.log('i-am-here')
        return client.messages.create({
            body: body,
            to: to,  // Text this number
            from: from // From a valid Twilio number
        }).then(data => data).catch(error => error)
    }
}