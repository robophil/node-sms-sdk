const configStore = require("./config-store")
const configKey = 'sdk-in-use-*'

module.exports = {
    setConfig: (sdk, config, adapter) => {
        //store config
        configStore.set(sdk, {
            config,
            adapter
        })
        //load config for adapter
        if (adapter === undefined || adapter === null || !adapter) {
            try {
                require('./sdk/' + sdk).loadConfig(config)
            } catch (ex) {
                throw new Error("could not load adapter")
            }
        } else {
            configStore.get(sdk).adapter.loadConfig(config)
        }
    },
    getConfig: (sdk) => {
        if (sdk && configStore.has(sdk)) return configStore.get(sdk)
        else {
            const _val = {}
            configStore.forEach((value, key) => {
                _val[key] = value.config || value
            })
            return _val
        }
    },
    use: (sdk) => {
        configStore.set(configKey, sdk)
    },
    getSdkInstance: (sdk) => {
        const hasAdapter = configStore.get(sdk).adapter
        if (hasAdapter === undefined || hasAdapter === null || !hasAdapter) {
            return require('./sdk/'+sdk).raw()
        }else{
            configStore.get(sdk).adapter.raw()
        }
    },
    send: (data) => {
        if (configStore.has(configKey)) {
            const sdk = configStore.get(configKey)
            const hasAdapter = configStore.get(sdk).adapter
            if (hasAdapter === undefined || hasAdapter === null || !hasAdapter) {
                console.log("message sent from local sdk")
                return require('./sdk/' + configStore.get(configKey)).send(data)
            } else {
                console.log("message sent from adapter sdk")
                return configStore.get(sdk).adapter.send(data)
            }
        } else {
            return Promise.catch("No default SDK has been selected for use, \ncall .use('sdk') to select on")
        }
    }
}