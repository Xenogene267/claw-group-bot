/**
 * 网梗库管理
 */

const fs = require('fs');
const MEME_PATH = './config/memes.json';

function loadMemes() {
  try {
    return JSON.parse(fs.readFileSync(MEME_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function getActiveMemes() {
  return loadMemes().filter(m => m.status === 'active');
}

function useMeme(memeId) {
  const memes = loadMemes();
  const m = memes.find(x => x.id === memeId);
  if (m) {
    m.useCount = (m.useCount || 0) + 1;
    m.lastUsed = Date.now();
    fs.writeFileSync(MEME_PATH, JSON.stringify(memes, null, 2));
  }
}

module.exports = { loadMemes, getActiveMemes, useMeme };
