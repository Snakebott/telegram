/// telegram ///
const http = require("https")
const url = require("url")

const botapi = {
    config: {
        bot: {
            api : "",
            token: "",
            pluginDir: "",
            botowner: [],
            longPoll: false,
            longPollingTimeout: 30
        }
    },

    configure: (config)=>{
        botapi.config = (config)? config : this.config
    },

    getConfig: ()=>{
        return botapi.config
    },

    httpOpt: (headers)=>{
        return {
            host: url.parse(botapi.config.bot.api).host,
            port: url.parse(botapi.config.bot.api).port,
            method: 'POST',
            protocol: url.parse(botapi.config.bot.api).protocol,
            path: url.parse(botapi.config.bot.api).path,
            headers: {...headers, "Content-Type": "application/json"}
        }
    },

    getMe: async (callback)=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/getMe`, {
            method: "get",
            headers: {"Content-Type": "application/json"}
        }).then((result)=>{
            result.text().then((data)=>{callback(JSON.parse(data))})
        }).catch((error)=>{
            callback({err: error})
        })
    },

    getChat: async (callback, chat_id)=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/getChat`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chat_id
            })
        }).then((result)=>{
            result.text().then((data)=>{callback(JSON.parse(data))})
        }).catch((error)=>{
            callback({err: error})
        })
    },

    getUpdatePolling: async (callback, offset = -1, timeout = 0)=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/getUpdates`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                offset: offset,
                timeout: timeout
            })
        }).then((result)=>{
            result.text().then((data)=>{
                callback(JSON.parse(data))
            })
        }).catch((error)=>{
            callback({err: error})
        })
    }
}

module.exports = {
    botapi
}
