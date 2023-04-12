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

    sendMessage: async(
        callback,
        chat_id,
        text,
        disable_notification,
        protect_content,
        reply_to_message_id,
        allow_sending_without_reply,
        parse_mode,
        entities,
        disable_web_page_preview,
        reply_markup
    )=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/sendMessage`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
               chat_id: chat_id,
               text: text,
               disable_notification: disable_notification,
               protect_content: protect_content,
               reply_to_message_id: reply_to_message_id,
               allow_sending_without_reply: allow_sending_without_reply,
               parse_mode: parse_mode,
               entities: entities,
               disable_notification: disable_notification
            })
        }).then((result)=>{
            result.text().then((data)=>{
                callback(JSON.parse(data))
            }).catch((error)=>{
                callback({err: error})
            })
        })
    },

    close: async(callback)=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/close`, {
            method: "post",
            headers: {"Content-Type": "application/json"}
        }).then((result)=>{
            result.text().then((data)=>{
                callback(JSON.parse(data))
            })
        }).catch((error)=>{
            callback({err: error})
        })
    },

    getUpdatePolling: async (callback, offset = -1, timeout = 0, allowed_updates = [])=>{
        await fetch(`${botapi.config.bot.api}/${botapi.config.bot.token}/getUpdates`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                offset: offset,
                timeout: timeout,
                allowed_updates: allowed_updates
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
