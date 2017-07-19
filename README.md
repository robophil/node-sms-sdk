# node-sms-sdk
    Sdk for working with multiple sms gateway.

## Install
```bash
    npm i --save node-sms-sdk
```
or
```bash
    yarn add node-sms-sdk
```
then you use in your project

```javascript
    const nodeSmsSdk = require('node-sms-sdk')
```

## Api

```javascript
    /**
    * @param sdk : The name of the sdk. This could be anything, except
    *              when using an internally shipped sdk like 'twilio' or 'infobip'.
    *              You can override any of the internally shipped ones with yours by calling this
    *              method and passing an adapter
    * @param config : (object) the configuration needed by this sdk
    * @param adapter : (module) the sdk's adapter. This is used when using an external sdk
    **/
<<<<<<< HEAD
    nodeSmsSdk.setConfig(sdk, config, adapter) : void
=======
    nodeSmsSdk.addConfig(sdk: string, config:object [, adapter]) : void
>>>>>>> hotfix/update

	/**
    * @param sdk : the name of the sdk
    * 
    * @return : returns the config for that sdk, if not available, it
    *           returns all available config
    **/
    nodeSmsSdk.getConfig(sdk: string) : Object
    
    /**
    * @param sdk : the name of the sdk that you want to set as the
    *              default
    **/
    nodeSmsSdk.use(sdk: string) : void
    
    /**
    * @param sdk : the name of the sdk that you want to get
    * @return : returns the instance of the raw sdk.
    **/
    nodeSmsSdk.getSdkInstance(sdk: string) : sdk
    
    /**
    * @param data : (object)
    * data = {
    * 	from: 'sender',
    * 	to: 'recipient', //this could be an array
    * 	body: 'message to be sent'
	* }
    * @return : Promise
    **/
    nodeSmsSdk.send(data: object) : Promise<any>
``` 

## Build your own adapter
Building your own adapter is pretty easy and straight forward.
Simply write a module that has the following exports.
What to do when you're done??
1. Publish to **npm** and have others used it.
2. Fork this repo
3. Add your sdk to the list of available sdk below, add link to your repo so others can find, send a **PR** 

```javascript
	module.exports = {
    	/**
        * This takes a config object that it can use to initialize 
        * module
        **/
    	loadConfig: (config: object) => {
        	
        },
        
        /**
        * Returns a tbe current instance of the adapter. 
        * Gives you access to the raw module by the provider
        * 
        * @return adapter
        **/
        raw: () => {
        	
        },
        
        /**
        * This method should send a message and return a promise
        * 
        * @param from: number or name sending the message
        * @parm to: the number(s) you're sending the message to. 
        *           This could also be an array
        * @parm body: The message to be sent
        **/
        send: ({ from, to, body }) => {
        	
        }
    }
```
## SDKs available
1. twilio (internal)
2. infobip (internal)
3. ADD_YOURS_HERE (send PR)


## Example usage

```javascript
    //require  module 
	const nodeSmsSdk = require('node-sms-sdk')

    //add config for an sdk. twilio ships internally
    nodeSmsSdk.addConfig('twilio',{
        accountSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 
        authToken: 'your_auth_token'
    })

    //use twilio as default
    nodeSmsSdk.use('twilio')

    //send message
    nodeSmsSdk.send({
    	from: '+2348120725879', 
        to: '+23408040320343', 
        body: 'This works yay!!!'
    }).then(console.log).catch(console.log)
```
