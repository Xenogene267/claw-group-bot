/**
 * 群友画像管理
 */

const fs = require('fs');
const PROFILE_PATH = './data/profiles.json';

function loadProfiles() {
  try {
    return JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function saveProfiles(profiles) {
  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(profiles, null, 2));
}

function getProfile(userId) {
  const profiles = loadProfiles();
  return profiles[userId] || { messageCount: 0, tags: [], tier: 'new' };
}

function updateProfile(userId, msg) {
  const profiles = loadProfiles();
  const p = profiles[userId] || { messageCount: 0, tags: [], tier: 'new', lastSeen: 0 };
  p.messageCount++;
  p.lastSeen = Date.now();
  // 分层：高活跃 / 中活跃 / 低活跃
  if (p.messageCount > 100) p.tier = 'high';
  else if (p.messageCount > 20) p.tier = 'mid';
  else p.tier = 'low';
  profiles[userId] = p;
  saveProfiles(profiles);
}

module.exports = { getProfile, updateProfile };
