# login
Connects to the (specified) server, then logs in.
## Parameters
### username
The user to login as.
### password
The password for the user to be logged in.
### server [optional]
The server to connect to. Default is `wss://server.meower.org`.
### prefix [optional]
The prefix to use. Default is a ping to the specified username.
## Example
```js
import Bot from "@meower-community/meower";

const bot = new Bot();

bot.login("username", "password", "wss://server.meower.org/", "username");
```
