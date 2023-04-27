require("dotenv").config();
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

/*
{
  client_msg_id: '9f124135-6f03-49c9-b95e-a0ff0612f5b2',
  type: 'message',
  text: 'fsdf',
  user: 'U04BT9KC71A',
  ts: '1682567979.023929',
  blocks: [ { type: 'rich_text', block_id: 'y0TR8', elements: [Array] } ],
  team: 'T04BQNBKXB5',
  channel: 'D055ELNCGL8',
  event_ts: '1682567979.023929',
  channel_type: 'im'
}
{
  bot_id: 'B055ELNBYNL',
  type: 'message',
  text: 'dfsf',
  user: 'U054ADTM1EK',
  ts: '1682568016.994409',
  app_id: 'A054TD8HDGC',
  blocks: [ { type: 'rich_text', block_id: '7I59', elements: [Array] } ],
  team: 'T04BQNBKXB5',
  bot_profile: {
    id: 'B055ELNBYNL',
    deleted: false,
    name: 'ChatAI',
    updated: 1682377707,
    app_id: 'A054TD8HDGC',
    icons: {
      image_36: 'https://a.slack-edge.com/80588/img/plugins/app/bot_36.png',
      image_48: 'https://a.slack-edge.com/80588/img/plugins/app/bot_48.png',
      image_72: 'https://a.slack-edge.com/80588/img/plugins/app/service_72.png'
    },
    team_id: 'T04BQNBKXB5'
  },
  channel: 'D055ELNCGL8',
  event_ts: '1682568016.994409',
  channel_type: 'im'
}
*/

function gpt(text) {
    return text;
}

slackEvents.on('message', (event) => {
    if (event.bot_id) {
        return; // ignore messages sent by the bot itself
    }

    let user = `<@${event.user}>`,
        channel = `<#${event.channel}|>`;

    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

    web.chat.postMessage({
        channel: event.channel,
        text: `${user} said ${event.text} in ${channel}`,
    });
});

slackEvents.on('app_mention', (event) => {
    let user = `<@${event.user}>`,
        channel = `<#${event.channel}>`;

    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

    web.chat.postMessage({
        channel: event.channel,
        text: `${user} said ${event.text} in ${channel}`,
    });
});

slackEvents.start(process.env.APP_PORT)
    .then(server => {
        console.log(`Listening for events on ${server.address().port}`);
    });