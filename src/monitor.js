/**
 * 消息监控窗口
 * @虾哥后开启5分钟窗口，每30秒扫描是否有追问
 */

class MonitorWindow {
  constructor() {
    this.windows = new Map(); // chatId -> expireTime
  }

  open(chatId, durationMs = 5 * 60 * 1000) {
    this.windows.set(chatId, Date.now() + durationMs);
  }

  isActive(chatId) {
    const expire = this.windows.get(chatId);
    if (!expire) return false;
    if (Date.now() > expire) {
      this.windows.delete(chatId);
      return false;
    }
    return true;
  }

  close(chatId) {
    this.windows.delete(chatId);
  }
}

module.exports = { MonitorWindow };
