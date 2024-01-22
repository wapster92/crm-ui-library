const execSync = require('child_process').execSync;

const branchName = execSync('git symbolic-ref --short HEAD').toString().trim();

const isValidBranchName = /^(tasks|feature|epics|bugfix)\/WL-\d+$/.test(branchName);

if (!isValidBranchName) {
  console.error(`Invalid branch name: ${branchName}`);
  console.error('Branch name should be in format: (feature|epics|bugfix)/WL-<issue_number>');
  process.exit(1);
}
