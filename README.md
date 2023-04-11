# Node.js Telegram API Wrapper
This is a simple Node.js wrapper for the Telegram Bot API. It provides a convenient way to interact with Telegram Bots by abstracting away the low-level details of the Telegram Bot API.

## Installation
To install this package, run the following command:

```css
npm install --save node-telegram-api-wrapper
```

## Usage

### Initialization
First, require the package in your code:
```javascript
const telegramApi = require('node-telegram-api-wrapper');
```

## Configuration
To configure the API, call the `configure()` method and pass in the configuration object:

```javascript
telegramApi.telegram.configure({
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
telegramApi.telegram.getChat((data) => {
    console.log(data);
}, chat_id);
```

`getChat(callback, chat_id)`

Gets information about a chat.
```javascript
telegramApi.telegram.getChat((data) => {
    console.log(data);
}, chat_id);
```

`getUpdatePolling(callback, offset, timeout)`

Polls for updates from Telegram.

```javascript
telegramApi.telegram.getUpdatePolling((data) => {
    console.log(data);
}, offset, timeout);
```

## License
Apache-2.0
