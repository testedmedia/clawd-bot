#!/usr/bin/env node
const { execSync } = require('child_process');

const checks = [
  { name: 'Syntax check', cmd: 'node --check index.js' },
];

let failed = 0;
console.log('Pre-deploy checks for Clawd');
console.log('----------------------------');

for (const c of checks) {
  try {
    execSync(c.cmd, { stdio: 'pipe', cwd: __dirname + '/..' });
    console.log(`PASS: ${c.name}`);
  } catch (e) {
    console.log(`FAIL: ${c.name}`);
    failed++;
  }
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed) {
  console.log('Pre-deploy FAILED. Fix issues before deploying.');
  process.exit(1);
} else {
  console.log('Pre-deploy PASSED. Ready to deploy.');
}
