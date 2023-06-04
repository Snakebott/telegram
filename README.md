# Node.js Telegram API Wrapper
This is a simple Node.js wrapper for the Telegram Bot API. It provides a convenient way to interact with Telegram Bots by abstracting away the low-level details of the Telegram Bot API.

## Installation
To install this package, run the following command:

```css
npm install @snakebot/telegram
```

## Usage

### Initialization
First, require the package in your code:
```javascript
const telegramApi = require('@snakebot/telegram');
```

## classes
* botapi

## Configuration
To configure the API, call the `configure()` method and pass in the configuration object:

```javascript
telegramApi.botapi.configure({
    bot: {
        api : "https://api.telegram.org",
        token: "<YOUR_BOT_TOKEN>",
        longPoll: false,
        longPollingTimeout: 30
    }
});
```

## Methods
`getMe(callback)`

Gets information about the bot.

```javascript
telegramApi.botapi.getChat((data) => {
    console.log(data);
}, chat_id);
```

`getChat(callback, chat_id)`

Gets information about a chat.
```javascript
telegramApi.botapi.getChat((data) => {
    console.log(data);
}, chat_id);
```

`sendMessage(
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
    reply_markup)`

Use this method to send text messages. On success, the sent Message is returned.

```javascript
telegramApi.botapi.sendMessage((result)=>{
    if(result.err){
        console.log(err.message)
    } else {
        console.log(result)
    }
}, 
    320794723, 
    "sorry, bot is not yet ready",
    true,)
```

`close(callback)`

Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters

```javascript
telegramApi.botapi.close((data) => {
    console.log(data);
});
```

`logout(callback)`

Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters.

```javascript
telegramApi.botapi.logout((data) => {
    console.log(data);
});
```

`getUpdatePolling(callback, offset, timeout)`

Polls for updates from Telegram.

```javascript
telegramApi.botapi.getUpdatePolling((data) => {
    console.log(data);
}, offset, timeout);
```

`getWebhookInfo(callback)`

Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty.

```javascript
telegramApi.botapi.getWebhookInfo((data) => {
    console.log(data)
})
```

`deleteWebhook(callback, drop_pending_updates)`

Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success.

```javascript
telegramApi.botapi.deleteWebhook((data) => {
    console.log(data)
})
```

## License
Apache-2.0
