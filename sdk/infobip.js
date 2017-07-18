const request = require('request-promise-native')
const base64 = require('base-64')

let encoding = null, options = null

module.exports = {

    loadConfig: (config) => {
        if (config.username && config.password) {
            encoding = base64.encode(`${config.username}:${config.password}`)
            options = {
                uri: 'https://api.infobip.com/sms/1/text/single',
                method: 'POST',
                qs: {
                },
                headers: {
                    'Authorization': `Basic ${encoding}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                json: true // Automatically parses the JSON string in the response 
            }
            return loaded = true
        } else {
            return false
        }
    },

    raw: () => {
        if (options != null) return request(options)
        else return new Error("sdk hasn't been loaded")
    },

    send: ({ from, to, body }) => {
        Object.assign(options, {
            body: {
                text: body,
                to: to,  // Text this number
                from: from // From a valid Twilio number
            }
        })
        return request(options)
    }

    
}