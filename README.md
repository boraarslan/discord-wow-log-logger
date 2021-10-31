# LogLogger

LogLogger is a discord bot that helps you organise your WarcraftLogs dungeon logs. When a WarcraftLogs link that contains a single Mythic+ log, LogLogger automatically creates an embed and deletes the link.

## Usage

Clone the repository, create a `.env` file in the root directory. Create these variables in it:

>- `WL_CLIENT_ID` = *Your WarcraftLogs APIv2 client id*
>- `WL_CLIENT_SECRET` = *Your WarcraftLogs APIv2 client secret*
>- `DISCORD_BOT_TOKEN` = *Your Discord Bot token*

then run:

```bash
npm install
node index.js
```

*Latest version of Node is recommended.*

## Example Images

![Image 1](/example_images/asset1.png)
![Image 1](/example_images/asset2.png)