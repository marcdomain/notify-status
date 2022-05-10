exports.teams_payload = (
  ref,
  repo,
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
      activitySubtitle: `https://github.com/${username}.png ${username}`,
      facts: [
        {
          name: 'Ref:',
          value: `${repo} [${ref}](${compare})`,
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
