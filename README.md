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
        pluginDir: "",
        botowner: [],
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

`getUpdatePolling(callback, offset, timeout)`

Polls for updates from Telegram.

```javascript
telegramApi.botapi.getUpdatePolling((data) => {
    console.log(data);
}, offset, timeout);
```

## License
Apache-2.0
