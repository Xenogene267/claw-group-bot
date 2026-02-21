/**
 * 意图识别：规则前筛 + Claude 3.5 Haiku 轻量判断
 */

const INTENT = {
  CHAT: { action: 'reply', type: 'chat' },
  TECH_SIMPLE: { action: 'reply', type: 'tech_simple' },
  TECH_DEEP: { action: 'reply_doc', type: 'tech_deep' },
  MEME: { action: 'reply', type: 'meme' },
  WELCOME: { action: 'reply', type: 'welcome' },
  ADMIN: { action: 'admin', type: 'admin' },
  IGNORE: { action: 'ignore', type: 'ignore' },
};
// 意图识别用 Claude 3.5 Haiku（便宜快速）
// 正式回复统一用 Claude Opus

const TECH_KEYWORDS = [
  'agent', 'llm', 'rag', 'mcp', 'prompt', 'embedding', 'fine-tune',
  'langchain', 'cursor', 'claude', 'gpt', 'gemini', 'openai',
  '模型', '框架', '报错', '怎么实现', '推荐', '对比', '部署', 'api',
];

const DEEP_KEYWORDS = ['详细', '对比', '分析', '展开', '写个文档'];

const ADMIN_KEYWORDS = ['虾哥静音', '虾哥恢复', '整理精华', '虾哥报账'];

async function classifyIntent(msg) {
  // 被@：100%回复，不走意图识别，直接调 Opus
  if (msg.isAtBot) {
    if (ADMIN_KEYWORDS.some(k => msg.text.toLowerCase().includes(k)) && msg.isAdmin) {
      return INTENT.ADMIN;
    }
    if (DEEP_KEYWORDS.some(k => msg.text.toLowerCase().includes(k))) {
      return INTENT.TECH_DEEP;
    }
    if (TECH_KEYWORDS.some(k => msg.text.toLowerCase().includes(k))) {
      return INTENT.TECH_SIMPLE;
    }
    return INTENT.CHAT;
  }

  const text = msg.text.toLowerCase();

  // 新人入群
  if (msg.type === 'member_join') return INTENT.WELCOME;

  // 其他：忽略
  return INTENT.IGNORE;
}

async function haikuJudge(msg) {
  // 调用 Claude 3.5 Haiku 判断是否需要虾哥回复
  // 输入：最近5条消息 + 当前消息
  // 输出：reply / ignore
  // 成本：~$0.001/次
  // TODO: 实现 Haiku API 调用
  return INTENT.IGNORE;
}

module.exports = { classifyIntent, INTENT };
