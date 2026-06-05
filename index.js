/// telegram ///
// const http = require("https")
const url = require("url")

const botapi = {
    config: {
        bot: {
            api : "",
            token: "",
            longPoll: false,
            longPollingTimeout: 30
        }
    },

    configure: (config = {
        bot: {
            api: "",
            token: "",
            longPoll: false,
            longPollingTimeout: 30
        }
    })=>{
        botapi.config.bot = (config && config.bot)? Object.assign(botapi.config.bot, config.bot) : null
    },

    getConfig: ()=>{
        return botapi.config
    },

    _request: async (methodName, body = {})=>{
        const url = `${botapi.config.bot.api}/bot${botapi.config.bot.token}/${methodName}`

        const httpOpt = {
            method: "POST"
        }

        if (body instanceof FormData){
            httpOpt.body = body
        } else {
            httpOpt.headers = {"Content-Type": "application/json"}
            httpOpt.body = JSON.stringify(body)
        }

        const response = await fetch(url, httpOpt)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(`[BotAPI] Error# status: ${response.status}, error: ${response.statusText}`)
        }

        if (!data.ok) {
            throw new Error(`Telegram semantic error: ${data.description}`)
        }

        return data
    },

    getMe: async ()=>{
        return await botapi._request("getMe")
    },

    getChat: async (chat_id)=>{
        return await botapi._request("getChat", {chat_id: chat_id})
    },

    sendMessage: async ({
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
    } = {} )=>{
        if (!chat_id || !text){
            throw new Error(`[BotAPI] Error# chat_id and text must required`)
        }

        return await botapi._request("sendMessage", {
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
        })
    },

    close: async ()=>{
        return await botapi._request("close")
    },

    logOut: async ()=>{
        return await botapi._request("logOut")
    },

    getUpdatePolling: async (offset = -1, timeout = 30, allowed_updates = [])=>{
        return await botapi._request("getUpdates", {
            offset: offset,
            timeout: timeout,
            allowed_updates: allowed_updates
        })
    },

    getWebhookInfo: async ()=>{
        return await botapi._request("getWebhookInfo")
    },

    deleteWebhook: async ({
        drop_pending_updates
    } = {})=>{
        return await botapi._request("deleteWebhook", {drop_pending_updates: drop_pending_updates})
    },

    setWebhook: async ({
        url,
        certificate,
        ip_address,
        max_connections,
        allowed_updates,
        drop_pending_updates,
        secret_token
    } = {})=>{
        if(!url){
            throw new Error("[BotApi] Error# empty url")
        }
        return await botapi._request("setWebhook", {
            url: url,
            certificate: certificate,
            ip_address: ip_address,
            max_connections: max_connections,
            allowed_updates: allowed_updates,
            drop_pending_updates: drop_pending_updates,
            secret_token: secret_token
        })
    }
}

module.exports = {
    botapi
}
