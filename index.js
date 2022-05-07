const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

let STATUS = core.getInput('status');
const MESSAGE = core.getInput('message');
const NOTIFY_ON = core.getInput('notify_on');
const APP = core.getInput('app').toLowerCase();
const WEBHOOK_URL = core.getInput('webhook_url');

const {
  payload: {repository, head_commit, compare, ref},
  eventName,
  runId,
} = github.context;
const pipeline_execution = `${repository.url}/actions/runs/${runId}`;
const status_options = ['success', 'failure'];
const notify_options = [...status_options, 'default'];
const app_options = ['Slack', 'Teams', 'Gmail'];

if (!status_options.includes(STATUS)) core.setFailed(`
  status property must be any of <${status_options.join(', ')}>.\n
  Use \${{ job.status }} if you want status to assume the status of the job under which this action is being used.
`);
if (!notify_options.includes(NOTIFY_ON)) core.setFailed(`notify_on property must be any of <${notify_options.join(', ')}>`);
if (!app_options.map(v => v.toLowerCase()).includes(APP)) core.setFailed(`app property must be any of <${app_options.join(', ')}>`);
if (MESSAGE.length > 100) core.setFailed(`message property cannot take more than 100 characters. You have entered ${MESSAGE.length}`);

const send_notification = async (APP) => {
  try {
    let app_payload;

    if (APP === 'slack') {
      app_payload = {
        text: MESSAGE,
        attachments: [
          {
            color: STATUS === 'success' ? '#008000' : '#FF0000',
            blocks: [
              {
                type: "context",
                elements: [
                  {
                    type: "image",
                    image_url: `https://github.com/${head_commit.committer.username}.png`,
                    alt_text: "images",
                  },
                  {
                    type: "mrkdwn",
                    text: `${head_commit.committer.username}`,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `*Ref:* <${compare}|${ref}>`,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `*Status:* <${pipeline_execution}|${eventName} event ${STATUS === 'success' ? 'succeeded 🎉' : 'failed 😰'}> `,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `*Commit:* ${head_commit.message}`,
                  },
                ],
              },
            ],
          },
        ],
      };
    }

    if (STATUS === NOTIFY_ON || NOTIFY_ON === 'default') {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(app_payload),
        headers: {'Content-Type': 'application/json'},
      });
    }

    // const data = await response.json();
    // console.log(data);

  } catch ({message}) {
    core.setFailed(message)
  }
}

send_notification(APP);
