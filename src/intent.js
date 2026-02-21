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
// 所有回复统一用 Claude Opus，不做模型分级

const TECH_KEYWORDS = [
  'agent', 'llm', 'rag', 'mcp', 'prompt', 'embedding', 'fine-tune',
  'langchain', 'cursor', 'claude', 'gpt', 'gemini', 'openai',
  '模型', '框架', '报错', '怎么实现', '推荐', '对比', '部署', 'api',
];

const DEEP_KEYWORDS = ['详细', '对比', '分析', '展开', '写个文档'];

const ADMIN_KEYWORDS = ['虾哥静音', '虾哥恢复', '整理精华', '虾哥报账'];

async function classifyIntent(msg) {
  const text = msg.text.toLowerCase();

  // 管理员指令（最高优先级）
  if (msg.isAdmin && ADMIN_KEYWORDS.some(k => text.includes(k))) {
    return INTENT.ADMIN;
  }

  // 新人入群
  if (msg.type === 'member_join') return INTENT.WELCOME;

  // 规则前筛：深度分析
  if (msg.isAtBot && DEEP_KEYWORDS.some(k => text.includes(k))) {
    return INTENT.TECH_DEEP;
  }

  // 规则前筛：技术问题
  if (TECH_KEYWORDS.some(k => text.includes(k))) {
    // 被@则直接回复，否则用 Haiku 判断是否需要回复
    if (msg.isAtBot) return INTENT.TECH_SIMPLE;
    return await haikuJudge(msg);
  }

  // 被@但非技术：闲聊
  if (msg.isAtBot) return INTENT.CHAT;

  // 其他：忽略
  return INTENT.IGNORE;
}

async function haikuJudge(msg) {
  // TODO: 调用 Claude 3.5 Haiku 判断是否需要虾哥回复
  // 输入：最近5条消息 + 当前消息
  // 输出：reply / ignore
  // 成本：~$0.001/次
  return INTENT.IGNORE;
}

module.exports = { classifyIntent, INTENT };
