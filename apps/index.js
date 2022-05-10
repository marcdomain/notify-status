const {slack_payload} = require('./slack');
const {teams_payload} = require('./teams');

module.exports = {
  slack: slack_payload,
  teams: teams_payload,
};
