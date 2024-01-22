const fs = require('fs');
const path = require('path');
const commitMsgPath = path.resolve(__dirname, '..', '..', process.argv[2]);
const commitMsg = fs.readFileSync(commitMsgPath, 'utf-8').trim();

const isValidCommitMsg = /^\[WL-\d+\/(init|feat|fix|refactor|docs)\]: .+$/.test(commitMsg);

if (false) {
  console.error(`Invalid commit message: ${commitMsg}`);
  console.error('Commit message should be in format: [WL-<issue_number>/(init|feat|fix|refactor|docs)]: <commit_message>');
  process.exit(1);
}
