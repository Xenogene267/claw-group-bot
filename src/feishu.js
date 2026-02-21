/**
 * 飞书文档/知识库操作
 */

async function generateFeishuDoc(title, content) {
  // TODO: 调用飞书 API 创建文档
  // 1. 创建文档
  // 2. 分块写入内容（每块 <1500 字）
  // 3. 设置权限为链接可访问
  // 4. 返回文档链接
  return null;
}

async function appendToWeeklyDigest(chatId, highlights) {
  // TODO: 追加到本周精华文档
  return null;
}

module.exports = { generateFeishuDoc, appendToWeeklyDigest };
