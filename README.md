This bot will listen to your Slack conversation on the channels that it's a member of, and will reply to mentions of what it thinks are RTC work item numbers with links to those work items.

In order to configure up the bot, you must set the following environment properties:

 - BOT_API_TOKEN: This is the API token given to the bot by Slack.
 - JAZZ_URI: This is the URI of the Jazz server, such as `https://my.rtc.host:9443/jazz`.

Invite the bot to the channels you want it to monitor, and it'll pick up on mentions of:

 - task XXXXX
 - story XXXXX
 - epic XXXXX
 - defect XXXXX
