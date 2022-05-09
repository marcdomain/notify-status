const core = require('@actions/core');
const fetch = require('node-fetch');
const {slack_payload} = require('./slack');
const {handle_inputs} = require('./input');
const {
  ref,
  app,
  name,
  status,
  compare,
  message,
  username,
  eventName,
  notify_on,
  webhook_url,
  commit_message,
  pipeline_execution,
} = handle_inputs();
const color = status === 'success' ? '#008000' : '#B30000'
const status_summary = `event ${status === 'success' ? 'succeeded 🚀' : 'failed 😰'}`;

const send_notification = async (app) => {
  try {
    let app_payload;

    if (app === 'slack') {
      app_payload = slack_payload(
        ref,
        name,
        color,
        message,
        compare,
        username,
        eventName,
        commit_message,
        status_summary,
        pipeline_execution,
      );
    }

    if (notify_on === status || notify_on === 'default') {
      await fetch(webhook_url, {
        method: "POST",
        body: JSON.stringify(app_payload),
        headers: {'Content-Type': 'application/json'},
      });
    }

  } catch ({message}) {
    core.setFailed(message)
  }
}

send_notification(app);
