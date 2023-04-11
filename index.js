/// telegram ///
const http = require("https")
const url = require("url")

const telegram = {
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
        telegram.config = (config)? config : this.config
    },

    getConfig: ()=>{
        return telegram.config
    },

    httpOpt: (headers)=>{
        return {
            host: url.parse(telegram.config.bot.api).host,
            port: url.parse(telegram.config.bot.api).port,
            method: 'POST',
            protocol: url.parse(telegram.config.bot.api).protocol,
            path: url.parse(telegram.config.bot.api).path,
            headers: {...headers, "Content-Type": "application/json"}
        }
    },

    getMe: async (callback)=>{
        await fetch(`${telegram.config.bot.api}/${telegram.config.bot.token}/getMe`, {
            method: "get",
            headers: {"Content-Type": "application/json"}
        }).then((result)=>{
            result.text().then((data)=>{callback(JSON.parse(data))})
        }).catch((error)=>{
            callback({err: error})
        })
    },

    getChat: async (callback, chat_id)=>{
        await fetch(`${telegram.config.bot.api}/${telegram.config.bot.token}/getChat`, {
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

    getUpdatePolling: async (callback, offset = -1, timeout = 10)=>{
        await fetch(`${telegram.config.bot.api}/${telegram.config.bot.token}/getUpdates`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                offset: 0,
                timeout: 0
            })
        }).then((result)=>{
            result.text().then((data)=>{callback(JSON.parse(data))})
        }).catch((error)=>{
            callback({err: error})
        })
    }
}

module.exports = {
    telegram
}
