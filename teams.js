exports.teams_payload = (
  ref,
  name,
  color,
  compare,
  message,
  username,
  eventName,
  commit_message,
  status_summary,
  pipeline_execution,
) => {
  return {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: color,
    summary: "Pipeline execution",
    sections: [{
      activityTitle: message,
      activityImage: `https://github.com/${username}.png`,
      facts: [
        {
          name: "Committer:",
          value: `https://github.com/${username}.png ${username}`,
        },
        {
          name: 'Ref:',
          value: `${name} [${ref}](${compare})`,
        },
        {
          name: "Status:",
          value: `[${eventName} ${status_summary}](${pipeline_execution}) `,
        },
        {
          name: "Message:",
          value: commit_message,
        },
      ],
      markdown: true,
    }],
  };
};
