#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  const list = execSync('pm2 jlist', { encoding: 'utf8' });
  const procs = JSON.parse(list);
  const clawd = procs.find(p => p.name === 'clawd');
  if (clawd && clawd.pm2_env.status === 'online') {
    console.log('PASS: clawd process is online');
    console.log(`  Uptime: ${Math.round((Date.now() - clawd.pm2_env.pm_uptime) / 1000)}s`);
    console.log(`  Restarts: ${clawd.pm2_env.restart_time}`);
  } else {
    console.log('FAIL: clawd process not online');
    process.exit(1);
  }
} catch (e) {
  console.log(`FAIL: Could not check PM2 (${e.message})`);
  process.exit(1);
}
