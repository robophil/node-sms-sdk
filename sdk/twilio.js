const twilio = require('twilio')

let client = null

module.exports = {

    loadConfig: (config) => {
        if (config.accountSid && config.accountSid) {
            client = new twilio(config['accountSid'], config['authToken'])
            return loaded = true
        } else {
            return false
        }
    },

    raw: () => {
        if (client != null) return client
        else return new Error("sdk hasn't been loaded")
    },

    send: ({ from, to, body }) => {
        return client.messages.create({
            body: body,
            to: to,  // Text this number
            from: from // From a valid Twilio number
        })
    }
}