const core = require('@actions/core');
const github = require('@actions/github');

exports.handle_inputs = () => {
  let status = core.getInput('status');
  const message = core.getInput('message');
  const notify_on = core.getInput('notify_on');
  const app = core.getInput('app').toLowerCase();
  const webhook_url = core.getInput('webhook_url');

  const {
    runId,
    eventName,
    payload: {
      repository: {
        url,
        name,
      },
      head_commit: {
        committer: {username},
        message: commit_message
      },
      compare,
      ref
    },
  } = github.context;
  const pipeline_execution = `${url}/actions/runs/${runId}`;
  const status_options = ['success', 'failure'];
  const notify_options = [...status_options, 'default'];
  const app_options = ['Slack', 'Teams', 'Gmail'];

  if (!status_options.includes(status)) core.setFailed(`
    status property must be any of <${status_options.join(', ')}>.\n
    Use \${{ job.status }} if you want status to assume the status of the job under which this action is being used.
  `);
  if (!notify_options.includes(notify_on)) core.setFailed(`notify_on property must be any of <${notify_options.join(', ')}>`);
  if (!app_options.map(v => v.toLowerCase()).includes(app)) core.setFailed(`app property must be any of <${app_options.join(', ')}>`);
  if (message.length > 100) core.setFailed(`message property cannot take more than 100 characters. You have entered ${message.length}`);

  return {
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
  };
}
