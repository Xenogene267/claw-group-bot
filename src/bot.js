/**
 * 🦞哥眼不聋 - Bot 主入口
 */

const { classifyIntent } = require('./intent');
const { MonitorWindow } = require('./monitor');
const { generateFeishuDoc } = require('./feishu');
const { getProfile, updateProfile } = require('./profile');

// TODO: 接入 openclaw-wechat 插件
// const wechat = require('@canghe/openclaw-wechat');

class LobsterBot {
  constructor(config) {
    this.config = config;
    this.monitor = new MonitorWindow();
    this.silenceUntil = 0; // 静音截止时间戳
  }

  async handleMessage(msg) {
    // 静音模式检查
    if (Date.now() < this.silenceUntil) {
      if (!msg.isAtBot) return null;
    }

    // 规则前筛
    if (this.shouldIgnore(msg)) return null;

    // 意图识别（规则 + Haiku）
    const intent = await classifyIntent(msg);
    if (intent.action === 'ignore') return null;

    // 监控窗口：@虾哥后5分钟内持续关注
    if (msg.isAtBot) {
      this.monitor.open(msg.chatId, 5 * 60 * 1000);
    }

    // 分级调用 LLM
    const reply = await this.generateReply(msg, intent);

    // 更新群友画像
    updateProfile(msg.senderId, msg);

    return reply;
  }

  shouldIgnore(msg) {
    // 深夜模式：23:00-08:00 只响应 @
    const hour = new Date().getHours();
    if ((hour >= 23 || hour < 8) && !msg.isAtBot) return true;

    // 监控窗口外的非关键消息
    if (!msg.isAtBot && !this.monitor.isActive(msg.chatId)) {
      // 无关键词则忽略
      if (!this.hasKeywords(msg.text)) return true;
    }

    return false;
  }

  hasKeywords(text) {
    const keywords = ['agent', 'llm', 'ai', 'prompt', 'rag', 'mcp',
      '模型', '框架', '报错', '怎么实现', '推荐', '对比'];
    return keywords.some(k => text.toLowerCase().includes(k));
  }

  async generateReply(msg, intent) {
    // 意图识别用 Haiku（在 intent.js 里完成）
    // 正式回复统一用 Claude Opus
    // TODO: 调用 Opus 生成回复
    // 如果 intent.action === 'reply_doc'，同时生成飞书文档
    return null;
  }
}

module.exports = { LobsterBot };
