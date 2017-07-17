const configStore = require("./config-store")
const configKey = 'sdk-in-use-*'

module.exports = {
    addConfig: (sdk, config) => {
        configStore.set(sdk, config)
    },
    getConfig: (sdk) => {
        if (sdk && configStore.has(sdk)) return configStore.get(sdk)
        else {
            const _val = {}
            configStore.forEach((value, key) => {
                _val[key] = value
            })
            return _val
        }
    },
    use: (sdk) => {
        configStore.set(configKey, sdk)
        require('./sdk/'+configStore.get(configKey)).loadConfig()
    },
    getSdkInstance: (sdk) => {
        return require(sdk).raw()
    },
    send: (data) => {
        if(configStore.has(configKey)){
            return require('./sdk/'+configStore.get(configKey)).send(data)
        }else{
            return Promise.catch("config has not been loaded for this sdk")
        }
    }
}