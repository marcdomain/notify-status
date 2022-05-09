exports.slack_payload = (
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
) => {
  return {
    text: message,
    attachments: [
      {
        color,
        blocks: [
          {
            type: "context",
            elements: [
              {
                type: "image",
                image_url: `https://github.com/${username}.png`,
                alt_text: "images",
              },
              {
                type: "mrkdwn",
                text: username,
              },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Ref:* ${name} <${compare}|${ref}>`,
              },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Status:* <${pipeline_execution}|${eventName} ${status_summary}> `,
              },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Commit:* ${commit_message}`,
              },
            ],
          },
        ],
      },
    ],
  };
};
