# Telegram Bot API Wrapper

A lightweight, Promise-based Node.js wrapper for the Telegram Bot API with support for both webhook and long-polling update methods.

## Features

- 🚀 Simple and intuitive API
- 📡 Support for both webhook and long-polling updates
- 🔄 Promise-based async/await interface
- 🛡️ Built-in error handling
- 📦 Zero dependencies (uses native `fetch`)
- ⚡ Lightweight and fast

## Installation

```bash
npm install your-bot-package
```
# Quick Start
const { botapi } = require('./your-bot-file');
```javascript
// Configure your bot
botapi.configure({
    bot: {
        api: "https://api.telegram.org",
        token: "YOUR_BOT_TOKEN",
        longPoll: false,
        longPollingTimeout: 30
    }
});

// Send a message
async function sendHello() {
    try {
        const result = await botapi.sendMessage({
            chat_id: "123456789",
            text: "Hello from my bot!"
        });
        console.log("Message sent:", result);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

sendHello();
```

# Configuration

## Initialize the bot
```javascript
botapi.configure({
    bot: {
        api: "https://api.telegram.org",  // API endpoint
        token: "YOUR_BOT_TOKEN",           // Bot token from @BotFather
        longPoll: false,                   // Enable long polling mode
        longPollingTimeout: 30             // Long polling timeout in seconds
    }
});
```
# API Methods

## Core Methods
### getMe()
```javascript
const botInfo = await botapi.getMe();
console.log(botInfo.result.username);
```

### getChat(chat_id)
Get information about a chat.
```javascript
const chatInfo = await botapi.getChat("123456789");
```

### sendMessage(params)
Send a text message

#### Parameters:

- chat_id (required) - Unique identifier for the target chat
- text (required) - Text of the message to be sent
- disable_notification - Sends the message silently
- protect_content - Protects the message content from forwarding
- reply_to_message_id - Reply to a specific message
- allow_sending_without_reply - Allow sending without reply
- parse_mode - Parse mode ('HTML' or 'MarkdownV2')
- entities - Special message entities
- disable_web_page_preview - Disables link previews
- reply_markup - Additional interface options

```javascript
await botapi.sendMessage({
    chat_id: "123456789",
    text: "<b>Bold text</b> and <i>italic</i>",
    parse_mode: "HTML",
    disable_web_page_preview: true
});
```

## Webhook Methods
### setWebhook(params)
Set a webhook URL for receiving updates
```javascript
await botapi.setWebhook({
    url: "https://your-domain.com/webhook",
    max_connections: 40,
    allowed_updates: ["message", "callback_query"],
    secret_token: "your-secret-token"
});
```

### deleteWebhook(params)
Remove webhook integration.
```javascript
await botapi.deleteWebhook({ drop_pending_updates: true });
```

### getWebhookInfo()
Get current webhook status.
```javascript
const webhookInfo = await botapi.getWebhookInfo();
```

## Long Polling Methods
### getUpdatePolling(offset, timeout, allowed_updates)
Get updates using long polling.
```javascript
const updates = await botapi.getUpdatePolling(-1, 30, ["message"]);
```

## Session Management
### close()
Close the bot instance.
```javascript
await botapi.close();
```

### logOut()
Log out from the Bot API.
```javascript
await botapi.logOut();
```

# Error Handling
The wrapper throws errors in two cases:

### HTTP errors - When the request fails
Telegram semantic errors - When Telegram returns ok: false
```javascript
try {
    await botapi.sendMessage({ chat_id: "123", text: "Hello" });
} catch (error) {
    if (error.message.includes("Telegram semantic error")) {
        console.error("Telegram API error:", error.message);
    } else {
        console.error("Network or other error:", error.message);
    }
}
```

## Examples
### Echo Bot with Long Polling
```javascript
async function startEchoBot() {
    let offset = 0;
    
    while (true) {
        try {
            const updates = await botapi.getUpdatePolling(offset, 30);
            
            for (const update of updates.result) {
                if (update.message && update.message.text) {
                    await botapi.sendMessage({
                        chat_id: update.message.chat.id,
                        text: `Echo: ${update.message.text}`
                    });
                }
                offset = update.update_id + 1;
            }
        } catch (error) {
            console.error("Polling error:", error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

startEchoBot();
```

### Webhook Handler Example (Express)
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        await botapi.sendMessage({
            chat_id: update.message.chat.id,
            text: `You said: ${update.message.text}`
        });
    }
    
    res.sendStatus(200);
});

app.listen(3000);
```

## Requirements

- Node.js 18+ (for native fetch support)
- A Telegram Bot Token from [@BotFather](https://t.me/botfather)

### License
MIT

## Contributing
Contributions are welcome! Please submit a Pull Request or open an Issue on GitHub.

## Support
For Telegram Bot API documentation, visit [core.telegram.org/bots/api](core.telegram.org/bots/api)

```text

This README provides:
- Clear installation and setup instructions
- Complete API documentation with examples
- Error handling guidance
- Practical usage examples for both polling and webhook modes
- Requirements and support information

The documentation is structured to help developers quickly understand and implement the bot wrapper in their projects.
```
